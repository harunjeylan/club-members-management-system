import prisma from '../../prisma/PrismaClient';

export default async function getAllFilesAPi(req, res) {
  try {
    const files = await prisma.fileModel.findMany();
    return res.status(200).json({
      files: files,
    });
  } catch (error) {
    res.status(400).send({ details: error, code: 'get_files' });
  }
}
