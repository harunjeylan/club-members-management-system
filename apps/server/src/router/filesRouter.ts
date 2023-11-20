import express from 'express';
import getAllFilesAPi from '../api/files/getAllFilesApi';
import createFileApi from '../api/files/createFileApi';


const router = express.Router();
router.get('/', getAllFilesAPi);
router.post('/', createFileApi);

export default router;
