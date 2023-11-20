export default async function getAllFilesAPi(req, res) {
  try {
    // const files = await FileModel.find();
    return res.status(200).json({
      files: [],
    });
  } catch (error) {
    res.status(400).send({ details: error, code: 'get_files' });
  }
}
