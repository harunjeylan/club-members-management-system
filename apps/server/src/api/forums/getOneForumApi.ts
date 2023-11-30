import { ForumScop, Role, RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import getArrayValues from '@libs/utils/getArrayValues';

export default async function getOneEventApi(req, res) {
  const { forumId } = req.params;
  const { populate } = req.query;
  try {
    let populations = {};
    getArrayValues(populate).forEach((item: string) => {
      if (item === 'space') {
        populations['space'] = true;
      }
      if (item === 'messages') {
        populations['messages'] = {
          include: {
            user: {
              include: {
                profile: {
                  include: {
                    image: true,
                  },
                },
              },
            },
            reply: {
              include: {
                user: true,
              },
            },
          },
        };
      }

      if (item === 'author') {
        populations['author'] = {
          include: {
            profile: {
              include: {
                image: true,
              },
            },
          },
        };
      }
    });
    const superAdminRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);

    if (superAdminRoles.length) {
      const forum = await prisma.forum.findFirst({
        include: populations,
        where: { id: forumId },
      });
      if (!forum) {
        return res.sendStatus(404);
      }
      return res.status(200).json({
        forum: forum,
      });
    }

    const forum = await prisma.forum.findFirst({
      include: populations,
      where: {
        id: forumId,
        OR: [
          {
            authorId: req.user.id,
          },
          {
            scop: ForumScop.GENERAL,
          },
          {
            spaceName: {
              in: req.user.roles.map((role: Role) => role.spaceName),
            },
          },
        ],
      },
    });
    if (!forum) {
      return res.sendStatus(404);
    }
    return res.status(200).json({
      forum: forum,
    });
  } catch (error) {
    return res.status(500).json({ errors: [{ message: error.message }] });
  }
}
