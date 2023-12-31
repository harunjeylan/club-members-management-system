import { z } from 'zod';
import { Repeat, RoleCode, RoleScop } from '@prisma/client';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import getFieldsData from '@libs/utils/getFieldsData';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { fromZodError } from 'zod-validation-error';

export default async function updateEventApi(req, res) {
  const { eventId } = req.params;
  const fields = [
    'title',
    'startAt',
    'endAt',
    'fullDay',
    'repeat',
    'location',
    'description',
    'published',
    'categoryId',
    'spaceName',
  ];
  const fieldsData = getFieldsData(req.body, fields);

  try {
    const superAdminAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);
    const spaceAdminAccessRoles = getUserAccessRoles(req.user.roles, [
      {
        scop: RoleScop.SPACE,
        code: RoleCode.ADMIN,
        spaceName: fieldsData['spaceName'],
      },
      {
        scop: RoleScop.SPACE,
        code: RoleCode.EDITOR,
        spaceName: fieldsData['spaceName'],
      },
    ]);
    if (![...superAdminAccessRoles, ...spaceAdminAccessRoles].length) {
      return res.sendStatus(403);
    }

    const zodSchema = z.object({
      title: z.string(),
      startAt: z.string().optional(),
      endAt: z.string().optional(),
      fullDay: z.boolean().optional(),
      repeat: z
        .enum([
          Repeat.NO_REPEAT,
          Repeat.EVERY_DAY,
          Repeat.EVERY_WEEK,
          Repeat.EVERY_MONTH,
          Repeat.EVERY_YEAR,
        ])
        .optional(),
      description: z.string().optional(),
      location: z.string().optional(),
      categoryId: z.string().optional(),
      published: z.boolean().optional(),
      spaceName: z.string().optional(),
    });

    //@ts-ignore: Unreachable code error
    const { success, error } = zodSchema.safeParse(fieldsData);

    if (!success) {
      return res.status(409).json({ errors: fromZodError(error).details });
    }if (fieldsData['startAt']) {
      fieldsData['startAt'] = new Date(fieldsData['startAt']).toISOString();
    }
    if (fieldsData['endAt']) {
      fieldsData['endAt'] = new Date(fieldsData['endAt']).toISOString();
    }
    let populations = {};
    populations['author'] = {
      include: {
        profile: {
          include: {
            image: true,
          },
        },
      },
    };

    if (fieldsData['categoryId']?.length) {
      populations['category'] = true;
    }
    if (fieldsData['spaceName']?.length) {
      populations['space'] = true;
    }
    if (superAdminAccessRoles.length) {
      const event = await prisma.event.update({
        where: {
          id: eventId,
        },
        data: fieldsData,
        include: populations,
      });

      return res.status(200).json({
        event: event,
      });
    } else if (spaceAdminAccessRoles) {
      const event = await prisma.event.update({
        where: {
          id: eventId,
          authorId: req.user.id,
        },
        data: fieldsData,
        include: populations,
      });

      return res.status(200).json({
        event: event,
      });
    }
    return res.sendStatus(403);
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ errors: [{ message: error.message }] })
  }
}
