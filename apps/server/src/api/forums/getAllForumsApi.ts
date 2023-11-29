import getArrayValues from '@libs/utils/getArrayValues';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { ForumScop, Role, RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';

export default async function getAllEventsApi(req, res) {
  const { populate } = req.query;
  try {
    let populations = {};
    getArrayValues(populate).forEach((item: string) => {
      if (item === 'space') {
        populations['space'] = true;
      }
      if (item === 'author') {
        populations['author'] = {
          include: {
            profile: {
              include: {
                image: true,
              },
            },
          },
        };
      }
    });
    const superAdminRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);
    
    if (superAdminRoles.length) {
      const forums = await prisma.forum.findMany({
        include: populations,
      });
      return res.status(200).json({
        forums: forums,
      });
    }

    const forums = await prisma.forum.findMany({
      include: populations,
      where: {
        OR: [
          {
            authorId: req.user.id,
          },
          {
            scop: ForumScop.GENERAL,
          },
          {
            spaceName: {
              in: req.user.roles.map((role: Role) => role.spaceName),
            },
          },
        ],
      },
    });

    return res.status(200).json({
      forums: forums,
    });
  } catch (error) {
    return res.status(500).json({ errors: [{ message: error.message }] });
  }
}
