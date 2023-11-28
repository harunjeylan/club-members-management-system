import { Role, RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import getArrayValues from '@libs/utils/getArrayValues';

export default async function getOneBlogApi(req, res) {
  const { slug } = req.params;
  const { populate } = req.query;
  ;

  try {
    let populations = {};
    getArrayValues(populate).forEach((item: string) => {
      if (item === 'space') {
        populations['space'] = true;
      }
      if (item === 'category') {
        populations['category'] = true;
      }
      if (item === 'image') {
        populations['image'] = true;
      }
      if (item === 'author') {
        populations['author'] = {
          include: {
            profile: {
              include: {
                image: true,
              },
            },
          },
        };
      }
    });
    let superAdminRoles = [];

    if (req.user) {
      superAdminRoles = getUserAccessRoles(req.user.roles, [
        { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
        { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
        { scop: RoleScop.SPACE, code: RoleCode.ADMIN },
        { scop: RoleScop.SPACE, code: RoleCode.EDITOR },
      ]);
    }
    ;
    if (!req.user || !superAdminRoles.length) {
      const blog = await prisma.blog.findFirst({
        include: populations,
        where: { slug: slug, published: true },
      });
      if (!blog) {
        return res.sendStatus(404);
      }
      return res.status(200).json({
        blog: blog,
      });
    }
   
    const blog = await prisma.blog.findFirst({
      include: populations,
      where: {
        slug: slug,
        OR: [
          {
            authorId: req.user.id,
          },
          { published: true },
        ],
      },
    });
    if (!blog) {
      return res.sendStatus(404);
    }
    return res.status(200).json({
      blog: blog,
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ errors: [{ message: error.message }] })
  }
}
