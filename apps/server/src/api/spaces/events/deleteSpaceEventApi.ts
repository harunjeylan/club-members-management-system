import { RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import {getUserAccessRoles} from "@libs/utils/getUserAccessRoles";

export default async function deleteSpaceEventApi(req, res) {
  const { eventId, spaceName } = req.params;
  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
      { scop: RoleScop.SPACE, code: RoleCode.ADMIN, spaceName: spaceName },
      { scop: RoleScop.SPACE, code: RoleCode.EDITOR, spaceName: spaceName },
    ]);
    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }

    await prisma.event.delete({
      where: {
        id: eventId,
      },
    });
    return res.status(200).json({
      message: 'Event deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'create-user' });
  } 
}
