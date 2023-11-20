import { RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { getUserAccessRoles } from 'apps/server/src/utils/getUserAccessRoles';

export default async function getAllRolesApi(req, res) {
  const { spaceName } = req.params;
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
    ]);

    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }

    const roles = await prisma.role.findMany({
      where: { spaceName: spaceName },
    });
    return res.status(200).json({
      roles: roles,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'create-user' });
  } 
}
