import { RoleCode, RoleScop, Blog, Repeat } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { z } from 'zod';

export default async function createBlogApi(req, res) {
  const {
    title,
    slug,
    published,
    description,
    content,
    keyword,
    categoryId,
    spaceName,
    fileModelId,
    authorId,
  }: Blog = req.body;

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
    const { success, error } = zodSchema.safeParse({
      title,
      slug,
      published,
      description,
      content,
      keyword,
      categoryId,
      spaceName,
      fileModelId,
      authorId,
    });

    if (!success) {
      return res.status(409).json({
        message: 'Invalid Data',
        details: error.issues,
        code: 'create-event',
      });
    }

    const fieldsData = {
      title,
      slug,
      published,
      description,
      content,
      keyword,
      categoryId,
      spaceName,
      fileModelId,
      authorId: req.user.id,
    };
    
    if (fieldsData['published']) {
      fieldsData['publishedAt'] = new Date().toISOString();
    }

    let populations = {};
    if (fieldsData['categoryId']?.length) {
      populations['category'] = true;
    }
    if (fieldsData['spaceName']?.length) {
      populations['space'] = true;
    }
    if (fieldsData['fileModelId']?.length) {
      populations['image'] = true;
    }

    const blog = await prisma.blog.create({
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
      .json({ message: error.message, code: 'create-user' });
  }
}
