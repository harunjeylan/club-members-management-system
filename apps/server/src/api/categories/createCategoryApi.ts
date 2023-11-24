import { RoleCode, RoleScop, Category, Repeat } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { z } from 'zod';

export default async function createCategoryApi(req, res) {
  const { name, mainCategoryId } = req.body;

  try {
    const userAccessRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
      { scop: RoleScop.SPACE, code: RoleCode.ADMIN },
      { scop: RoleScop.SPACE, code: RoleCode.EDITOR },
    ]);
    if (!userAccessRoles.length) {
      return res.sendStatus(403);
    }
    const zodSchema = z.object({
      name: z.string(),
      mainCategoryId: z.string().or(z.undefined()),
    });

    //@ts-ignore: Unreachable code error
    const { success, error } = zodSchema.safeParse({
      name,
      mainCategoryId,
    });

    if (!success) {
      console.log(error.issues);

      return res.status(409).json({
        message: 'Invalid Data',
        details: error.issues,
        code: 'create-event',
      });
    }

    const fieldsData = {
      name,
    };

    if (mainCategoryId?.length) {
      fieldsData['category'] = {
        connect: {
          id: mainCategoryId,
        },
      };
    }

    console.log(fieldsData);

    const category = await prisma.category.create({
      data: fieldsData,
    });
    return res.status(200).json({
      category: category,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'create-user' });
  }
}
