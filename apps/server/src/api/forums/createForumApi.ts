import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import {
  Forum,
  ForumScop,
  RoleCode,
  RoleScop
} from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export default async function createEventApi(req, res) {
  const { spaceName } = req.body;
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
      {
        scop: RoleScop.SPACE,
        code: RoleCode.ADMIN,
        spaceName: spaceName,
      },
      {
        scop: RoleScop.SPACE,
        code: RoleCode.EDITOR,
        spaceName: spaceName,
      },
    ]);
    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }
    const zodSchema = z.union([
      z.object({
        title: z.string(),
        description: z.string(),
        spaceName: z.string(),
        scop: z.literal(ForumScop.LOCAL),
      }),
      z.object({
        title: z.string(),
        description: z.string(),
        spaceName: z.null().optional(),
        scop: z.literal(ForumScop.GENERAL),
      }),
    ]);

    //@ts-ignore: Unreachable code error
    const { success, error, data } = zodSchema.safeParse(req.body);

    if (!success) {
      return res.status(409).json({ errors: fromZodError(error).details });
    }

    const forum = await prisma.forum.create({
      data: { ...data, authorId: req.user.id } as Forum,
      include: {
        space: true,
        author: {
          include: {
            profile: {
              include: {
                image: true,
              },
            },
          },
        },
      },
    });
    return res.status(200).json({
      forum: forum,
    });
  } catch (error) {
    return res.status(500).json({ errors: [{ message: error.message }] });
  }
}
