import { RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { getUserAccessRoles } from 'apps/server/src/utils/getUserAccessRoles';

export default async function getOneRoleApi(req, res) {
  const { spaceName, roleId } = req.params;
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
    ]);

    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }

    const role = await prisma.role.findFirst({
      where: { id: roleId, spaceName: spaceName },
    });
    if (!role) {
      return res.sendStatus(404);
    }
    return res.status(200).json({
      role: role,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'create-user' });
  } 
}
