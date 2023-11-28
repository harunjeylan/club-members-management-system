import getArrayValues from '@libs/utils/getArrayValues';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';

export default async function getAllEventsApi(req, res) {
  const { populate } = req.query;
  try {
    let populations = {};
    getArrayValues(populate).forEach((item: string) => {
      if (item === 'space') {
        populations['space'] = true;
      }
      if (item === 'category') {
        populations['category'] = true;
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
    let superAdminRoles = [];
    if (req.user) {
      superAdminRoles = getUserAccessRoles(req.user.roles, [
        { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
        { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
        { scop: RoleScop.SPACE, code: RoleCode.ADMIN },
        { scop: RoleScop.SPACE, code: RoleCode.EDITOR },
      ]);
    }
    if (!req.user || !superAdminRoles.length) {
      const events = await prisma.event.findMany({
        include: populations,
        where: { published: true },
      });
      return res.status(200).json({
        events: events,
      });
    }

    const events = await prisma.event.findMany({
      include: populations,
      where: {
        OR: [
          {
            authorId: req.user.id,
          },
          { published: true },
        ],
      },
    });

    return res.status(200).json({
      events: events,
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ errors: [{ message: error.message }] })
  }
}
