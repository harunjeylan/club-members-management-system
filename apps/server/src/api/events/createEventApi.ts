import { RoleCode, RoleScop, Event, Repeat } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { z } from 'zod';
import getFieldsData from '@libs/utils/getFieldsData';
import { fromZodError } from 'zod-validation-error';

export default async function createEventApi(req, res) {
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
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
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
    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }
    const zodSchema = z.object({
      title: z.string(),
      startAt: z.string(),
      endAt: z.string(),
      fullDay: z.boolean(),
      repeat: z.enum([
        Repeat.NO_REPEAT,
        Repeat.EVERY_DAY,
        Repeat.EVERY_WEEK,
        Repeat.EVERY_MONTH,
        Repeat.EVERY_YEAR,
      ]),
      description: z.string().optional(),
      location: z.string().optional(),
      categoryId: z.string().optional(),
      published: z.boolean(),
      spaceName: z.string().optional(),
    });

    //@ts-ignore: Unreachable code error
    const { success, error } = zodSchema.safeParse(fieldsData);

    if (!success) {
      return res.status(409).json({ errors: fromZodError(error).details });
    }

    fieldsData['authorId'] = req.user.id;

    if (fieldsData['startAt']) {
      fieldsData['startAt'] = new Date(fieldsData['startAt']).toISOString();
    }
    if (fieldsData['endAt']) {
      fieldsData['endAt'] = new Date(fieldsData['endAt']).toISOString();
    }

    if (fieldsData['published']) {
      fieldsData['publishedAt'] = new Date().toISOString();
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
    if (populations['spaceName']?.length) {
      fieldsData['spaceName'] = populations['spaceName'];
      populations['space'] = true;
    }

    const event = await prisma.event.create({
      data: fieldsData as Event,
      include: populations,
    });
    return res.status(200).json({
      event: event,
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ errors: [{ message: error.message }] })
  }
}
