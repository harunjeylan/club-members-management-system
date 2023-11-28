import { RoleCode, RoleScop } from '@prisma/client';
import prisma from '@server/prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { z } from 'zod';

export default async function createRoleApi(req, res) {
  const { name, code, scop, description, spaceName, users } = req.body;
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SPACE, code: RoleCode.ADMIN, spaceName: spaceName },
    ]);
    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }
    const zodSchema = z.object({
      name: z.string(),
      code: z.enum([RoleCode.ADMIN, RoleCode.EDITOR, RoleCode.MEMBER]),
      scop: z.enum([RoleScop.SUPER, RoleScop.SPACE]),
      description: z.string().or(z.undefined()),
      spaceName: z.string().or(z.undefined()),
    });

    //@ts-ignore: Unreachable code error
    const { success, error } = zodSchema.safeParse({
      name,
      code,
      scop,
      description,
      spaceName,
    });

    if (!success) {
      return res.status(409).json({
        message: 'Invalid Data',
        details: error.issues,
        code: 'create-event',
      });
    }
    const fieldsData = {
      name,
      code,
      scop,
      description,
    };

    let populations = {};
    if (spaceName?.length) {
      fieldsData['space'] = {
        connect: {
          name: spaceName,
        },
      };
      fieldsData["scop"] = RoleScop.SPACE
      populations['space'] = true;
    }
    if (users?.length) {
      fieldsData['users'] = {
        connect: users.map((userId: string) => ({
          id: userId,
        })),
      };
      populations['users'] = true;
    }
    const role = await prisma.role.create({
      data: fieldsData,
      include: populations,
    });
    return res.status(200).json({
      role: role,
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ message: error.message, code: 'create-user' });
  }
}
