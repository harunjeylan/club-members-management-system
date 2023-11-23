import { getUserAccessRoles } from "@libs/utils/getUserAccessRoles";
import { RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';

export default async function deleteRoleApi(req, res) {
  const {  roleId } = req.params;
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
    ]);
    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }

    await prisma.role.delete({
      where: {
        id: roleId,
      },
    });
    return res.status(200).json({
      message: 'Role deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'delete-role' });
  }
}
