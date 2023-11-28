import { RoleCode, RoleScop } from '@prisma/client';
import prisma from '../../prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import getArrayValues from '@libs/utils/getArrayValues';

export default async function getOneSpaceApi(req, res) {
  const { spaceName } = req.params;
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
      if (item === 'blogs') {
        populations['blogs'] = {
          include: {
            image: true,
          },
        };
      }
    });
    let space = null;
    if (adminAccessRoles.length) {
      space = await prisma.space.findFirst({
        where: {
          name: spaceName,
        },
        include: populations,
      });
    } else if (memberAccessRoles) {
      space = await prisma.space.findFirst({
        include: populations,
        where: {
          name: spaceName,
          users: {
            some: {
              id: req.user.id,
            },
          },
        },
      });
    } else {
      space = await prisma.space.findFirst({
        include: populations,
        where: {
          name: spaceName,
          isPrivate: false,
        },
      });
    }
    if (!space) {
      res.sendStatus(404);
    }

    return res.status(200).json({
      space: space,
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ message: error.message, code: 'create-user' });
  }
}
