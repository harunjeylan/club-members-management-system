import { z } from 'zod';

import { RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';

export default async function removeUsersFromRoleApi(req, res) {
  const { roleId } = req.params;
  const { users } = req.body;
  try {
    
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);

    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }
    const zodSchema = z.object({
      users: z.array(z.string()),
    });

    //@ts-ignore: Unreachable code error
    const { success, error } = zodSchema.safeParse({users});

    if (!success) {
      return res.status(409).json({
        message: 'Invalid Data',
        details: error.issues,
        code: 'register-user',
      });
    }
    const role = await prisma.role.update({
      where: {
        id: roleId,
      },
      data: {
        users: {
          disconnect: users.map((userId: string) => ({
            id: userId,
          })),
        },
      },
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
