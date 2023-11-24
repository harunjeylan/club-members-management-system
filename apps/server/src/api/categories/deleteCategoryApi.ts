import { RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';

export default async function deleteCategoryApi(req, res) {
  const { categoryId } = req.params;
  const { categoryIds } = req.body;
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
      { scop: RoleScop.SPACE, code: RoleCode.ADMIN },
      { scop: RoleScop.SPACE, code: RoleCode.EDITOR },
    ]);
    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }

    if (categoryId) {
      await prisma.category.delete({
        where: {
          id: categoryId,
        },
      });
    }
    if (categoryIds?.length) {
      await prisma.category.deleteMany({
        where: {
          id: {
            in: categoryIds,
          },
        },
      });
    }
    return res.status(200).json({
      deleted: { categoryIds, categoryId },
      message: 'Category deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'create-user' });
  }
}
