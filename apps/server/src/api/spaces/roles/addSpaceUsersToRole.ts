import { z } from 'zod';

import { RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';

export default async function addSpaceUsersToRole(req, res) {
  const { roleId, spaceName } = req.params;
  const { users } = req.body;
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
      { scop: RoleScop.SPACE, code: RoleCode.ADMIN, spaceName: spaceName },
      { scop: RoleScop.SPACE, code: RoleCode.EDITOR, spaceName: spaceName },
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
    const space = await prisma.role.update({
      where: {
        spaceName: spaceName,
        id: roleId,
      },
      data: {
        users: {
          connect: users.map((userId: string) => ({
            id: userId
          })),
        },
      },
    });

    return res.status(200).json({
      space: space,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'update-user' });
  }
}
