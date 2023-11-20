import { z } from 'zod';
import { RoleCode, RoleScop } from '@prisma/client';
import getFieldsData from 'apps/server/src/utils/getFieldsData';
import { getUserAccessRoles } from 'apps/server/src/utils/getUserAccessRoles';
import prisma from 'apps/server/src/prisma/PrismaClient';

export default async function updateUserApi(req, res) {
  const { userId, spaceName } = req.params;
  const fields = ['username', 'first_name', 'last_name', 'email', 'roles'];
  const fieldsData = getFieldsData(req.body, fields);
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
      { scop: RoleScop.SPACE, code: RoleCode.ADMIN, spaceName: spaceName },
    ]);
    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }
    const zodSchema = z.object({
      username: z.string().min(3).nullable(),
      first_name: z.string().min(3).nullable(),
      last_name: z.string().nullable(),
      email: z.string().email().nullable(),
      roles: z.array(z.string()),
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

    if (fieldsData['roles']) {
      fieldsData['roles'] = {
        connect: fieldsData['roles'],
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
