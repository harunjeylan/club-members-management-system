import { RoleCode, RoleScop } from '@prisma/client';
import prisma from '../../prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';

export default async function deleteUserApi(req, res) {
  const { userId } = req.params;
  const { userIds } = req.body;

  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);
    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }
    if (userId) {
      await prisma.user.delete({
        where: {
          id: userId,
        },
      });
    }
    if (userIds?.length) {
      await prisma.user.deleteMany({
        where: {
          id: {
            in: userIds,
          },
        },
      });
    }
    return res.status(200).json({
      deleted: { userId, userIds },
      message: 'User deleted successfully',
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ message: error.message, code: 'delete-user' });
  }
}
