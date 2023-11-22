import { RoleCode, RoleScop } from '@prisma/client';
import prisma from '../../prisma/PrismaClient';
import getArrayValues from '../../utils/getArrayValues';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';

export default async function getAllUsersApi(req, res) {
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
      if (item === 'roles') {
        populations['roles'] = true;
      }

      if (item === 'profile') {
        populations['profile'] = true;
      }
    });
    const users = await prisma.user.findMany({
      include: populations,
    });

    return res.status(200).json({
      users: users.map((user) => prisma.$exclude(user, ['password'])),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, code: 'get-users' });
  } 
}
