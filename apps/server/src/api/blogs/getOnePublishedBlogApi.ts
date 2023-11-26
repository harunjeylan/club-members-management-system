import getArrayValues from '@libs/utils/getArrayValues';
import prisma from 'apps/server/src/prisma/PrismaClient';

export default async function getOnePublishedBLogApi(req, res) {
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
    const blog = await prisma.blog.findFirst({
      where: { slug: slug, published: true },
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
