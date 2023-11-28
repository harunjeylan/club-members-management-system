import prisma from 'apps/server/src/prisma/PrismaClient';

export default async function getOneEventApi(req, res) {
  const { categoryId } = req.params;
  try {


    const category = await prisma.category.findFirst({
      where: { id: categoryId },
      include: {
        categories: true,
      },
    });

    return res.status(200).json({
      category: category,
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ errors: [{ message: error.message }] })
  }
}
