import { RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';

export default async function getOneEventApi(req, res) {
  const { eventId } = req.params;
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
      { scop: RoleScop.SUPER, code: RoleCode.MEMBER },
      { scop: RoleScop.SPACE, code: RoleCode.ADMIN },
      { scop: RoleScop.SPACE, code: RoleCode.EDITOR },
      { scop: RoleScop.SPACE, code: RoleCode.MEMBER },
    ]);

    if (!userAccessRoles.length) {
      const events = await prisma.event.findFirst({
        where: { id: eventId, published: true },
      });
      return res.status(200).json({
        events: events,
      });
    }

    const event = await prisma.event.findFirst({
      where: { id: eventId },
    });
    return res.status(200).json({
      event: event,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'create-user' });
  }
}
