import getArrayValues from '@libs/utils/getArrayValues';
import { getUserAccessRoles } from '@libs/utils/getUserAccessRoles';
import { Role, RoleCode, RoleScop } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';

export default async function getAllBlogsApi(req, res) {
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
      const blogs = await prisma.blog.findMany({
        include: populations,
      });
      return res.status(200).json({
        blogs: blogs,
      });
    }

    const blogs = await prisma.blog.findMany({
      include: populations,
      where: {
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
      blogs: blogs,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'create-user' });
  }
}
