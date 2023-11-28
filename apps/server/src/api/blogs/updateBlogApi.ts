import { z } from 'zod';
import { Repeat, RoleCode, RoleScop } from '@prisma/client';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import getFieldsData from '@libs/utils/getFieldsData';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { fromZodError } from 'zod-validation-error';

export default async function updateBlogApi(req, res) {
  const { slug } = req.params;
  const fields = [
    'title',
    'slug',
    'published',
    'description',
    'content',
    'keyword',
    'categoryId',
    'spaceName',
    'fileModelId',
    'authorId',
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
      slug: z.string(),
      published: z.boolean(),
      description: z.string().optional(),
      content: z.string().optional(),
      categoryId: z.string().optional(),
      keyword: z.string().optional(),
      fileModelId: z.string().optional(),
      spaceName: z.string().optional(),
    });
    //@ts-ignore: Unreachable code error
    const { success, error } = zodSchema.safeParse(fieldsData);

    if (!success) {
      return res.status(409).json({ errors: fromZodError(error).details });
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
    if (fieldsData['spaceName']?.length) {
      populations['space'] = true;
    }
    if (fieldsData['fileModelId']?.length) {
      populations['image'] = true;
    }
    ;

    if (superAdminAccessRoles.length) {
      const blog = await prisma.blog.update({
        where: {
          slug: slug,
        },
        data: fieldsData,
        include: populations,
      });

      return res.status(200).json({
        blog: blog,
      });
    } else if (spaceAdminAccessRoles) {
      const blog = await prisma.blog.update({
        where: {
          slug: slug,
          authorId: req.user.id,
        },
        data: fieldsData,
        include: populations,
      });

      return res.status(200).json({
        blog: blog,
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
