import uploadFiles from '../../helpers/uploadFiles';
import prisma from '../../prisma/PrismaClient';
export default async function uploadFilesApi(req, res) {
  if (!req.files) {
    res.status(400).json({ status: 'error', message: 'Missing files' });
  }
  try {
    const uploadedFiles = await uploadFiles(req.files);
    const files = await prisma.fileModel.createMany({
      data: uploadedFiles,
    });
    return res.status(200).json({
      files: files,
    });
  } catch (error) {
    res.status(400).send({ details: error, code: 'get_files' });
  }
}
