import prisma from '../../prisma/PrismaClient';

export default async function getOneFileAPi(req, res) {
  const { fileName } = req.params;
  try {
    const file = await prisma.fileModel.findFirst({
      where: {
        name: fileName,
      },
    });
    if (!file) {
      return res.sendStatus(404);
    }
    return res.status(200).json({
      file: file,
    });
  } catch (error) {
    res.status(400).send({ details: error, code: 'get_files' });
  }
}
