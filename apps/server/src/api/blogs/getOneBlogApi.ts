import { Role, RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import getArrayValues from '@libs/utils/getArrayValues';

export default async function getOneBlogApi(req, res) {
  const { slug } = req.params;
  const { populate } = req.query;
  try {
    let populations = {};
    getArrayValues(populate).forEach((item: string) => {
      if (item === 'space') {
        populations['space'] = true;
      }
      if (item === 'category') {
        populations['category'] = true;
      }
    });
    const superAdminRoles = getUserAccessRoles(req.user.roles, [
      { scop: RoleScop.SUPER, code: RoleCode.ADMIN },
      { scop: RoleScop.SUPER, code: RoleCode.EDITOR },
    ]);
    if (!!superAdminRoles.length) {
      const blog = await prisma.blog.findFirst({
        include: populations,
        where: { slug: slug },
      });
      return res.status(200).json({
        blog: blog,
      });
    }
    const blog = await prisma.blog.findFirst({
      include: populations,
      where: {
        id: slug,
        OR: [
          {
            spaceName: {
              in: req.user.roles.map((member: Role) => member.name),
            },
          },
          { published: true },
        ],
      },
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
