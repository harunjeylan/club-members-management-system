import { RoleCode, RoleScop, Blog, Repeat } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { z } from 'zod';
import getFieldsData from '@libs/utils/getFieldsData';

export default async function createBlogApi(req, res) {
  const { spaceName }: Blog = req.body;
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
  ];
  const fieldsData = getFieldsData(req.body, fields);
  ;

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
        code: 'create-event',
      });
    }

    fieldsData['authorId'] = req.user.id;

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

    const blog = await prisma.blog.create({
      data: fieldsData as Blog,
      include: populations,
    });
    return res.status(200).json({
      blog: blog,
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ message: error.message, code: 'create-user' });
  }
}
