import { Role, RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import getArrayValues from '@libs/utils/getArrayValues';

export default async function getOneEventApi(req, res) {
  const { eventId } = req.params;
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
      const event = await prisma.event.findFirst({
        include: populations,
        where: { id: eventId, published: true },
      });
      if (!event) {
        return res.sendStatus(404);
      }
      return res.status(200).json({
        event: event,
      });
    }
   
    const event = await prisma.event.findFirst({
      include: populations,
      where: {
        id: eventId,
        OR: [
          {
            authorId: req.user.id,
          },
          { published: true },
        ],
      },
    });
    if (!event) {
      return res.sendStatus(404);
    }
    return res.status(200).json({
      event: event,
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ message: error.message, code: 'create-user' });
  }
}
