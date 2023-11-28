import { RoleCode, RoleScop } from '@prisma/client';
import { z } from 'zod';
import prisma from '../../prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';

export default async function createSpaceApi(req, res) {
  const { name, isPrivate, description } = req.body;
  const { addUsers, addRoles } = req.body;
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);
    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }
    const zodSchema = z.object({
      name: z.string(),
      isPrivate: z.boolean(),
      description: z.string().optional(),
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
    const fieldsData = {
      name,
      isPrivate,
      description,
    };
    let populations = {};

    if (addUsers?.length) {
      fieldsData['users'] = {
        connect: addUsers.map((userId: string) => ({
          id: userId,
        })),
      };
      populations['users'] = {
        include: {
          profile: true,
        },
      };
    }
    if (addRoles?.length) {
      fieldsData['roles'] = {
        connect: addRoles.map((roleId: string) => ({
          id: roleId,
        })),
      };
    }

    const space = await prisma.space.create({
      data: fieldsData,
      include: populations,
    });
    return res.status(200).json({
      space: space,
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ message: error.message, code: 'create-user' });
  }
}
