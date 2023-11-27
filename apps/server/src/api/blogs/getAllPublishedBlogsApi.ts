import getArrayValues from '@libs/utils/getArrayValues';
import prisma from 'apps/server/src/prisma/PrismaClient';

export default async function getAllPublishedBlogsApi(req, res) {
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
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      include: populations,
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
