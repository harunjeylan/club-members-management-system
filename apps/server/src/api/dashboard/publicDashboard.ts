import getArrayValues from '@libs/utils/getArrayValues';
import { RoleCode, RoleScop } from '@prisma/client';
import prisma from '@server/prisma/PrismaClient';

export default async function publicDashboard(req, res) {
  const { populate } = req.query;
  console.log({ populate });

  try {

    const populations = {};
    const populateArray = getArrayValues(populate);
    if (populateArray.includes('spaces')) {
      const spaces = await prisma.space.count();
      populations['spaces'] = spaces;
    }
    if (populateArray.includes('categories')) {
      const categories = await prisma.category.count();
      populations['categories'] = categories;
    }
    if (populateArray.includes('users')) {
      const users = await prisma.user.count();
      populations['users'] = users;
    }
    if (populateArray.includes('superAdmins')) {
      const superAdmins = await prisma.user.count({
        where: {
          roles: {
            some: {
              code: RoleCode.ADMIN,
              scop: RoleScop.SUPER,
            },
          },
        },
      });
      populations['superAdmins'] = superAdmins;
    }
    if (populateArray.includes('superEditors')) {
      const superEditors = await prisma.user.count({
        where: {
          roles: {
            some: {
              code: RoleCode.EDITOR,
              scop: RoleScop.SUPER,
            },
          },
        },
      });
      populations['superEditors'] = superEditors;
    }
    if (populateArray.includes('spaceAdmins')) {
      const spaceAdmins = await prisma.user.count({
        where: {
          roles: {
            some: {
              code: RoleCode.ADMIN,
              scop: RoleScop.SPACE,
            },
          },
        },
      });
      populations['spaceAdmins'] = spaceAdmins;
    }
    if (populateArray.includes('spaceEditors')) {
      const spaceEditors = await prisma.user.count({
        where: {
          roles: {
            some: {
              code: RoleCode.EDITOR,
              scop: RoleScop.SPACE,
            },
          },
        },
      });
      populations['spaceEditors'] = spaceEditors;
    }
    if (populateArray.includes('events')) {
      const events = await prisma.event.count();

      populations['events'] = events;
      console.log({ populations });
    }
    if (populateArray.includes('blogs')) {
      const blogs = await prisma.blog.count();

      populations['blogs'] = blogs;
      console.log({ populations });
    }

    console.log({ populations });

    return res.status(200).json(populations);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'create-user' });
  }
}
