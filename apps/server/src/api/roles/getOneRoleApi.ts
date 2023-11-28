import { RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import getArrayValues from '@libs/utils/getArrayValues';

export default async function getOneRoleApi(req, res) {
  const { roleId } = req.params;
  const { populate } = req.query;

  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);

    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }
    let populations = {};
    getArrayValues(populate).forEach((item: string) => {
      if (item === 'users') {
        populations['users'] = true;
      }
      if (item === 'space') {
        populations['space'] = true;
      }
    });
    const role = await prisma.role.findFirst({
      where: { id: roleId },
      include: populations,
    });
    if (!role) {
      return res.sendStatus(404);
    }
    return res.status(200).json({
      role: role,
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ message: error.message, code: 'create-user' });
  }
}
