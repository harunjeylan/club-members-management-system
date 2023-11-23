import { z } from 'zod';
import prisma from '../../prisma/PrismaClient';
import getFieldsData from '../../utils/getFieldsData';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { RoleCode, RoleScop } from '@prisma/client';

export default async function updateUserApi(req, res) {
  const { userId } = req.params;
  const fields = ['username', 'first_name', 'last_name', 'email', 'roles', 'spaces'];
  const fieldsData = getFieldsData(req.body, fields);
  console.log({fieldsData});
  
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);
    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }
    const zodSchema = z.object({
      username: z.string().min(3).or(z.undefined()),
      first_name: z.string().min(3).or(z.undefined()),
      last_name: z.string().or(z.undefined()),
      email: z.string().email().or(z.undefined()),
      roles: z.array(z.string()).or(z.undefined()),
      spaces: z.array(z.string()).or(z.undefined()),
    });

    //@ts-ignore: Unreachable code error
    const { success, error } = zodSchema.safeParse(fieldsData);

    if (!success) {
      return res.status(409).json({
        message: 'Invalid Data',
        details: error.issues,
        code: 'register-user',
      });
    }

    if (fieldsData['spaces']) {
      fieldsData['spaces'] = {
        set: fieldsData['spaces'].map((id: string) => ({ id })),
      };
    }
    if (fieldsData['roles']) {
      fieldsData['roles'] = {
        set: fieldsData['roles'].map((id: string) => ({ id })),
      };
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: fieldsData,
    });

    return res.status(200).json({
      user: prisma.$exclude(user, ['password']),
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'update-user' });
  }
}
