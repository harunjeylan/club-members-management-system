import uploadFiles from '../../helpers/uploadFiles';
import prisma from '../../prisma/PrismaClient';
export default async function uploadFilesApi(req, res) {
  if (!req.files) {
    res.status(400).json({ status: 'error', message: 'Missing files' });
  }
  try {
    const uploadedFiles = await uploadFiles(req.files);
    const filesPromise = []
    uploadedFiles.forEach((uploadedFile) => {
      const file = prisma.fileModel.create({
        data: uploadedFile,
      });
      filesPromise.push(file)
    });


    // Wait for the promises to resolve
    const files = await Promise.all(filesPromise);

    return res.status(200).json({
      files: files,
    });
  } catch (error) {
    res.status(400).send({ details: error, code: 'get_files' });
  }
}
