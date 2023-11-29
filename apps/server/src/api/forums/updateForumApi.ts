import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { ForumScop, Role, RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export default async function updateEventApi(req, res) {
  const { forumId } = req.params;
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
        title: z.string().optional(),
        description: z.string().optional(),
        spaceName: z.string().optional(),
        scop: z.literal(ForumScop.LOCAL),
      }),
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        spaceName: z.null().optional(),
        scop: z.literal(ForumScop.GENERAL),
      }),
    ]);

    //@ts-ignore: Unreachable code error
    const { success, error, data } = zodSchema.safeParse(req.body);

    if (!success) {
      return res.status(409).json({ errors: fromZodError(error).details });
    }

    if (userAccessRoles.length) {
      const forum = await prisma.forum.update({
        data: data,
        where: { id: forumId },
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
      if (!forum) {
        return res.sendStatus(404);
      }
      return res.status(200).json({
        forum: forum,
      });
    }

    const forum = await prisma.forum.update({
      data: data,
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
      where: {
        id: forumId,
        authorId: req.user.id,
      },
    });
    if (!forum) {
      return res.sendStatus(404);
    }
    return res.sendStatus(403);
  } catch (error) {
    return res.status(500).json({ errors: [{ message: error.message }] });
  }
}
