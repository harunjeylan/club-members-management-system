import { z } from 'zod';
import { RoleCode, RoleScop } from '@prisma/client';
import {getUserAccessRoles} from "@libs/utils/getUserAccessRoles";
import prisma from 'apps/server/src/prisma/PrismaClient';
import getFieldsData from '@libs/utils/getFieldsData';

export default async function updateRoleApi(req, res) {
  const { roleId } = req.params;
  const fields = ['name', 'code', 'scop', 'description','users'];
  const fieldsData = getFieldsData(req.body, fields);
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
    ]);
    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }
    const zodSchema = z.object({
      name: z.string().min(3).or(z.undefined()),
      code: z
        .enum([RoleCode.ADMIN, RoleCode.EDITOR, RoleCode.MEMBER])
        .or(z.undefined()),
      scop: z.enum([RoleScop.SUPER, RoleScop.SPACE]).or(z.undefined()),
      users: z.array(z.string()).or(z.undefined()),
      description: z.string().or(z.undefined()),
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
    
    if (fieldsData['users']) {
      fieldsData['users'] = {
        connect: fieldsData['users'],
      };
    }
    
    const role = await prisma.role.update({
      where: {
        id: roleId,
      },
      data: fieldsData,
    });

    return res.status(200).json({
      role: role,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'update-user' });
  }
}
