import { RoleCode, RoleScop } from '@prisma/client';
import { z } from 'zod';
import prisma from '../../prisma/PrismaClient';
import { getUserAccessRoles } from '../../utils/getUserAccessRoles';

export default async function createSpaceApi(req, res) {
  const { name, isPrivate, description } = req.body;
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);
    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }
    const zodSchema = z.object({
      name: z.string().min(3),
      isPrivate: z.boolean(),
      description: z.string().nullable(),
    });

    //@ts-ignore: Unreachable code error
    const { success, error } = zodSchema.safeParse({
      name,
      isPrivate,
      description,
    });

    if (!success) {
      return res.status(409).json({
        message: 'Invalid Data',
        details: error.issues,
        code: 'register-space',
      });
    }

    let spaceExist = await prisma.space.findFirst({
      where: {
        name: name,
      },
    });

    if (spaceExist) {
      return res
        .status(409)
        .json({ message: 'Space already exists', code: 'create-space' });
    }

    const space = await prisma.space.create({
      data: {
        name,
        isPrivate,
        description,
      },
    });
    return res.status(200).json({
      space: space,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'create-user' });
  } 
}
