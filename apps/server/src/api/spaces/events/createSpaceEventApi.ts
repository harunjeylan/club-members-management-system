import { RoleCode, RoleScop, Event, Repeat } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import {getUserAccessRoles} from "@libs/utils/getUserAccessRoles"
import { z } from 'zod';

export default async function createSpaceEventApi(req, res) {
  const {
    title,
    startAt,
    endAt,
    fullDay,
    repeat,
    location,
    description,
    categoryId,
  } = req.body;
  const { spaceName } = req.params;
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
      title: z.string().min(3),
      startAt: z.date(),
      endAt: z.date(),
      fullDay: z.boolean(),
      repeat: z.enum([
        Repeat.NO_REPEAT,
        Repeat.EVERY_DAY,
        Repeat.EVERY_WEEK,
        Repeat.EVERY_MONTH,
        Repeat.EVERY_YEAR,
      ]),
      description: z.string().or(z.undefined()),
      location: z.string().or(z.undefined()),
      categoryId: z.string(),
    });

    //@ts-ignore: Unreachable code error
    const { success, error } = zodSchema.safeParse({
      title,
      startAt,
      endAt,
      fullDay,
      repeat,
      location,
      description,
      categoryId,
    });

    if (!success) {
      return res.status(409).json({
        message: 'Invalid Data',
        details: error.issues,
        code: 'create-event',
      });
    }

    const event = await prisma.event.create({
      data: {
        title,
        startAt,
        endAt,
        fullDay,
        repeat,
        location,
        description,
        category: {
          connect: {
            id: categoryId,
          },
        },
        space: {
          connect: {
            name: spaceName,
          },
        },
      },
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