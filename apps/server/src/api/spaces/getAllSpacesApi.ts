import { RoleCode, RoleScop } from '@prisma/client';
import prisma from '../../prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import getArrayValues from '@libs/utils/getArrayValues';

export default async function getAllSpacesApi(req, res) {
  const { populate } = req.query;

  try {
    const adminAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);
    const memberAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
      { scop: RoleScop.SUPER, code: RoleCode.MEMBER },
      { scop: RoleScop.SPACE, code: RoleCode.ADMIN },
      { scop: RoleScop.SPACE, code: RoleCode.EDITOR },
      { scop: RoleScop.SPACE, code: RoleCode.MEMBER },
    ]);
    if (![...adminAccessRoles, ...memberAccessRoles].length) {
      return res.sendStatus(403);
    }
    let populations = {};

    getArrayValues(populate).forEach((item: string) => {
      if (item === 'users') {
        populations['users'] = {
          include: {
            profile: true,
          },
        };
      }
      if (item === 'roles') {
        populations['roles'] = true;
      }
      if (item === 'events') {
        populations['events'] = {
          include: {
            category: true,
          },
        };
      }
    });

    let spaces = [];
    if (adminAccessRoles.length) {
      spaces = await prisma.space.findMany({
        include: populations,
      });
    } else if (memberAccessRoles) {
      spaces = await prisma.space.findMany({
        include: populations,
        where: {
          users: {
            some: {
              id: req.user.id,
            },
          },
        },
      });
    } else {
      spaces = await prisma.space.findMany({
        include: populations,
        where: {
          isPrivate: false,
        },
      });
    }

    return res.status(200).json({
      spaces: spaces,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'create-user' });
  }
}
