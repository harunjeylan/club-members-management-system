import { RoleCode, RoleScop } from '@prisma/client';
import prisma from '@server/prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { z } from 'zod';

export default async function createRoleApi(req, res) {
  const { name, code, scop, description } = req.body;
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
    ]);
    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }
    const zodSchema = z.object({
      name: z.string().min(3),
      code: z.enum([RoleCode.ADMIN, RoleCode.EDITOR, RoleCode.MEMBER]),
      scop: z.enum([RoleScop.SUPER, RoleScop.SPACE]),
      description: z.string().or(z.undefined()),
    });

    //@ts-ignore: Unreachable code error
    const { success, error } = zodSchema.safeParse({
      name,
      code,
      scop,
      description,
    });

    if (!success) {
      return res.status(409).json({
        message: 'Invalid Data',
        details: error.issues,
        code: 'create-event',
      });
    }

    const role = await prisma.role.create({
      data: {
        name,
        code,
        scop,
        description,
      },
    });
    return res.status(200).json({
      role: role,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'create-user' });
  }
}
