import { RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';

export default async function deleteEventApi(req, res) {
  const { forumId } = req.params;
  const { forumIds } = req.body;

  try {
    const superAdminAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);
    const spaceAdminAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SPACE, code: RoleCode.ADMIN },
      { scop: RoleScop.SPACE, code: RoleCode.EDITOR },
    ]);
    if (![...superAdminAccessRoles, ...spaceAdminAccessRoles].length) {
      return res.sendStatus(403);
    }
    if (superAdminAccessRoles.length) {
      if (forumId) {
        await prisma.forum.delete({
          where: {
            id: forumId,
          },
        });
      }
      if (forumIds?.length) {
        await prisma.forum.deleteMany({
          where: {
            id: {
              in: forumIds,
            },
          },
        });
      }
    } else if (spaceAdminAccessRoles) {
      if (forumId) {
        await prisma.forum.delete({
          where: {
            id: forumId,
            authorId: req.user.id,
          },
        });
      }
      if (forumIds?.length) {
        await prisma.forum.deleteMany({
          where: {
            id: {
              in: forumIds,
            },
            authorId: req.user.id,
          },
        });
      }
    }

    return res.status(200).json({
      deleted: { forumIds, forumId },
      message: 'Event deleted successfully',
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ errors: [{ message: error.message }] })
  }
}
