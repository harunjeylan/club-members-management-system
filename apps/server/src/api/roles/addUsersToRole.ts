import { z } from 'zod';

import { RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';

export default async function addUsersToRole(req, res) {
  const { roleId } = req.params;
  const { users } = req.body;
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
    ]);

    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }
    const zodSchema = z.object({
      users: z.array(z.string()),
    });

    //@ts-ignore: Unreachable code error
    const { success, error } = zodSchema.safeParse({ users });

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
          connect: users.map((userId: string) => ({
            id: userId,
          })),
        },
      },
      include: {
        users:true
      }
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
