import { RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import {getUserAccessRoles} from "@libs/utils/getUserAccessRoles"

export default async function getOneSpaceEventApi(req, res) {
  const { spaceName, eventId } = req.params;
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
      { scop: RoleScop.SPACE, code: RoleCode.ADMIN, spaceName: spaceName },
      { scop: RoleScop.SPACE, code: RoleCode.EDITOR, spaceName: spaceName },
    ]);

    if (!userAccessRoles.length) {
      const events = await prisma.event.findFirst({
        where: { id: eventId, spaceName: spaceName, published: true },
      });
      return res.status(200).json({
        events: events,
      });
    }

    const event = await prisma.event.findFirst({
      where: { id: eventId, spaceName: spaceName },
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
