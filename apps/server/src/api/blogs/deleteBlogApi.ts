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
        const blog = await prisma.blog.delete({
          where: {
            id: blogId,
          },
        });
        if (
          spaceAdminAccessRoles
            .map((role) => role.spaceName)
            .includes(blog.spaceName)
        ) {
          await prisma.blog.delete({
            where: {
              id: blogId,
            },
          });
        }
      }
      if (blogIds?.length) {
        await prisma.blog.deleteMany({
          where: {
            id: {
              in: blogIds,
            },
            spaceName: {
              in: spaceAdminAccessRoles.map((role) => role.spaceName),
            },
          },
        });
      }
    }

    return res.status(200).json({
      deleted: { blogIds, blogId },
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'create-user' });
  }
}
