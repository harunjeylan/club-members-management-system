import { RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';

export default async function getOneEventApi(req, res) {
  const { categoryId } = req.params;
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
      { scop: RoleScop.SUPER, code: RoleCode.MEMBER },
      { scop: RoleScop.SPACE, code: RoleCode.ADMIN },
      { scop: RoleScop.SPACE, code: RoleCode.EDITOR },
      { scop: RoleScop.SPACE, code: RoleCode.MEMBER },
    ]);

    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }

    const category = await prisma.category.findFirst({
      where: { id: categoryId },
      include: {
        categories: true,
      },
    });

    return res.status(200).json({
      category: category,
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ errors: [{ message: error.message }] })
  }
}
