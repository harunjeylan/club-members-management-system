import prisma from '../../prisma/PrismaClient';

export default async function deleteFilesAPi(req, res) {
  const { fileName } = req.params;
  const { fileIds } = req.body;
  try {
    await prisma.fileModel.deleteMany({
      where: {
        OR: [
          {
            id: {
              in: fileIds,
            },
          },
          {
            name: fileName,
          },
        ],
      },
    });
    return res.status(200).json({
      message: "files deleted",
    });
  } catch (error) {
    res.status(400).send({ details: error, code: 'get_files' });
  }
}
