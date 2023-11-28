import getFieldsData from '@libs/utils/getFieldsData';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { z } from 'zod';

export default async function updateEventApi(req, res) {
  const { categoryId } = req.params;
  const fields = ['name'];
  const fieldsData = getFieldsData(req.body, fields);
  const { mainCategoryId } = req.body;

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
      name: z.string().optional(),
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

    if (mainCategoryId?.length) {
      fieldsData['category'] = {
        connect: {
          id: mainCategoryId,
        },
      };
    }
    const category = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: fieldsData,
    });

    return res.status(200).json({
      category: category,
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ message: error.message, code: 'update-user' });
  }
}
