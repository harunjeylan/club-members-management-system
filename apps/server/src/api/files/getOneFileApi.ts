import path from 'path';
// import prisma from '../../prisma/PrismaClient';

export default async function getOneFileAPi(req, res) {
  const { fileName } = req.params;
  try {
    // const file = await prisma.fileModel.findFirst({
    //   where: {
    //     name: fileName,
    //   },
    // });
    // if (!file) {
    //   return res.sendStatus(404);
    // }
    return res.sendFile(path.join(__dirname, '../', 'uploads', fileName));
  } catch (error) {
    res.status(400).send({ details: error, code: 'get_files' });
  }
}
