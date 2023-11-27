import { z } from 'zod';
import { Repeat, RoleCode, RoleScop } from '@prisma/client';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import getFieldsData from '@libs/utils/getFieldsData';
import prisma from 'apps/server/src/prisma/PrismaClient';

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
      slug: z.string(),
      published: z.boolean(),
      description: z.string().or(z.undefined()),
      content: z.string().or(z.undefined()),
      categoryId: z.string().or(z.undefined()),
      keyword: z.string().or(z.undefined()),
      fileModelId: z.string().or(z.undefined()),
      spaceName: z.string().or(z.undefined()),
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
    console.log({fieldsData});

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
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'update-user' });
  }
}
