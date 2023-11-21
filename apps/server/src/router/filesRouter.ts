import express from 'express';
import getAllFilesAPi from '../api/files/getAllFilesApi';
import uploadFilesApi from '../api/files/uploadFilesApi';
import getOneFileAPi from '../api/files/getOneFileApi';
import deleteFilesAPi from '../api/files/deleteFilesApi';

const router = express.Router();
router.get('/', getAllFilesAPi);
router.post('/', uploadFilesApi);
router.post('/:fileName', getOneFileAPi);
router.delete('/:fileName', deleteFilesAPi);

export default router;
