import { RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';

export default async function deleteEventApi(req, res) {
  const { eventId } = req.params;
  const { eventIds } = req.body;

  try {
    const superAdminAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);
    const spaceAdminAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SPACE, code: RoleCode.ADMIN },
      { scop: RoleScop.SPACE, code: RoleCode.EDITOR },
    ]);
    if (![...superAdminAccessRoles, ...spaceAdminAccessRoles].length) {
      return res.sendStatus(403);
    }
    if (superAdminAccessRoles.length) {
      if (eventId) {
        await prisma.event.delete({
          where: {
            id: eventId,
          },
        });
      }
      if (eventIds?.length) {
        await prisma.event.deleteMany({
          where: {
            id: {
              in: eventIds,
            },
          },
        });
      }
    } else if (spaceAdminAccessRoles) {
      if (eventId) {
        const event = await prisma.event.delete({
          where: {
            id: eventId,
          },
        });
        if (
          spaceAdminAccessRoles
            .map((role) => role.spaceName)
            .includes(event.spaceName)
        ) {
          await prisma.event.delete({
            where: {
              id: eventId,
            },
          });
        }
      }
      if (eventIds?.length) {
        await prisma.event.deleteMany({
          where: {
            id: {
              in: eventIds,
            },
            spaceName: {
              in: spaceAdminAccessRoles.map((role) => role.spaceName),
            },
          },
        });
      }
    }

    return res.status(200).json({
      deleted: { eventIds, eventId },
      message: 'Event deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'create-user' });
  }
}
