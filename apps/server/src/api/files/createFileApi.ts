import uploadFiles from '../../helpers/uploadFiles';

export default async function createFileApi(req, res) {
  if (!req.files) {
    res.status(400).json({ status: 'error', message: 'Missing files' });
  }
  try {
    const uploadedFiles = await uploadFiles(req.files);
    // const files = await FileModel.collection.insertMany(uploadedFiles);
    return res.status(200).json({
      files: [],
    });
  } catch (error) {
    res.status(400).send({ details: error, code: 'get_files' });
  }
}
