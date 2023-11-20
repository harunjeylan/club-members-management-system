import { RoleCode, RoleScop } from '@prisma/client';
import { getUserAccessRoles } from 'apps/server/src/utils/getUserAccessRoles';
import prisma from '../../../prisma/PrismaClient';
import getArrayValues from '../../../utils/getArrayValues';

export default async function getOneSpaceUserApi(req, res) {
  const { userId, spaceName } = req.params;
  const { populate } = req.query;

  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
      { scop: RoleScop.SPACE, code: RoleCode.ADMIN, spaceName: spaceName },
      { scop: RoleScop.SPACE, code: RoleCode.EDITOR, spaceName: spaceName },
    ]);
    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }
    let populations = {};
    getArrayValues(populate).forEach((item: string) => {
      if (item === 'roles') {
        populations['roles'] = true;
      }

      if (item === 'profile') {
        populations['profile'] = true;
      }
    });
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: populations,
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User Not Exist', code: 'get-user' });
    }

    return res.status(200).json({
      user: prisma.$exclude(user, ['password']),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, code: 'get-user' });
  } 
}
