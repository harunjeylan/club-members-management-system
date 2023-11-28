import { Role, RoleCode, RoleScop, User } from '@prisma/client';
import prisma from '../../prisma/PrismaClient';
import getArrayValues from '@libs/utils/getArrayValues';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';

export default async function getOneUserApi(req, res) {
  const { userId } = req.params;
  const { populate } = req.query;

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
    let populations = {};
    getArrayValues(populate).forEach((item: string) => {
      if (item === 'roles') {
        populations['roles'] = true;
      }

      if (item === 'profile') {
        populations['profile'] = {
          include: {
            image: true,
          },
        };
      }
      if (item === 'spaces') {
        populations['spaces'] = true;
      }
    });

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: populations,
    });
    if (!user) {
      return res.sendStatus(404);
    }

    return res.status(200).json({
      user: prisma.$exclude(user, ['password']),
    });
  } catch (error) {
    ;
    return res.status(500).json({ errors: [{ message: error.message }] })
  }
}
