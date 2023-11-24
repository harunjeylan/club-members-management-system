import { RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';

export default async function deleteEventApi(req, res) {
  const { eventId } = req.params;
  const { eventIds } = req.body;
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);
    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }

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
