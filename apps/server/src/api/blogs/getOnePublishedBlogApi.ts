import getArrayValues from '@libs/utils/getArrayValues';
import prisma from 'apps/server/src/prisma/PrismaClient';

export default async function getOnePublishedBLogApi(req, res) {
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
    const blog = await prisma.blog.findFirst({
      where: { slug: slug, published: true },
      include: populations,
    });
    if (!blog) {
      return res.sendStatus(404)
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
