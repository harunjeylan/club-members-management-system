import { z } from 'zod';
import { RoleCode, RoleScop } from '@prisma/client';
import { getUserAccessRoles } from 'apps/server/src/utils/getUserAccessRoles';
import getFieldsData from 'apps/server/src/utils/getFieldsData';
import prisma from 'apps/server/src/prisma/PrismaClient';

export default async function updateEventApi(req, res) {
  const { spaceName, eventId } = req.params;
  const fields = ["name", "isPrivate", "description"];
  const fieldsData = getFieldsData(req.body, fields);
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
    const zodSchema = z.object({
      name: z.string().min(3).nullable(),
      isPrivate: z.boolean().nullable(),
      description: z.string().nullable(),
    });

    //@ts-ignore: Unreachable code error
    const { success, error } = zodSchema.safeParse(fieldsData);

    if (!success) {
      return res.status(409).json({
        message: 'Invalid Data',
        details: error.issues,
        code: 'register-user',
      });
    }
    const event = await prisma.event.update({
      where: {
        id: eventId,
      },
      data: fieldsData ,
    });

    return res.status(200).json({
      event: event,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'update-user' });
  } 
}
