import prisma from 'apps/server/src/prisma/PrismaClient';

export default async function getAllEventsApi(req, res) {
  try {

    const categories = await prisma.category.findMany({
      include: {
        categories: true,
      },
    });
    return res.status(200).json({
      categories: categories,
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ errors: [{ message: error.message }] })
  }
}
