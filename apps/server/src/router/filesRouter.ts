import express from 'express';
import getAllFilesAPi from '../api/files/getAllFilesApi';
import uploadFilesApi from '../api/files/uploadFilesApi';
import getOneFileAPi from '../api/files/getOneFileApi';
import deleteFilesAPi from '../api/files/deleteFilesApi';
import formidableMiddleware from 'express-formidable';
import { authenticateToken } from '@server/middlewares/authenticateToken';

const router = express.Router();
router.get('/', authenticateToken, getAllFilesAPi);
router.post('/', authenticateToken, formidableMiddleware(), uploadFilesApi);

router.get('/:fileName', getOneFileAPi);
router.delete('/:fileName', authenticateToken, deleteFilesAPi);

export default router;
