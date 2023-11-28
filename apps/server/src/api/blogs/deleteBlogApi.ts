import { RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';

export default async function deleteBlogApi(req, res) {
  const { blogId } = req.params;
  const { blogIds } = req.body;

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
      if (blogId) {
        await prisma.blog.delete({
          where: {
            id: blogId,
          },
        });
      }
      if (blogIds?.length) {
        await prisma.blog.deleteMany({
          where: {
            id: {
              in: blogIds,
            },
          },
        });
      }
    } else if (spaceAdminAccessRoles) {
      if (blogId) {
        await prisma.blog.delete({
          where: {
            id: blogId,
            authorId: req.user.id,
          },
        });
      }
      if (blogIds?.length) {
        await prisma.blog.deleteMany({
          where: {
            id: {
              in: blogIds,
            },
            authorId: req.user.id,
          },
        });
      }
    }

    return res.status(200).json({
      deleted: { blogIds, blogId },
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ errors: [{ message: error.message }] })
  }
}
