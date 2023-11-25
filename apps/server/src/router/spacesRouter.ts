import express from 'express';
import { authenticateToken } from '@server/middlewares/authenticateToken';
import createSpaceApi from '@server/api/spaces/createSpaceApi';
import getOneSpaceApi from '@server/api/spaces/getOneSpaceApi';
import updateSpaceApi from '@server/api/spaces/updateSpaceApi';
import deleteSpaceApi from '@server/api/spaces/deleteSpaceApi';
import getAllSpacesApi from '@server/api/spaces/getAllSpacesApi';

const router = express.Router();
router.get('/', authenticateToken, getAllSpacesApi);
router.get('/', authenticateToken, getAllSpacesApi);
router.post('/', authenticateToken, createSpaceApi);
router.put('/', authenticateToken, deleteSpaceApi);

router.get('/:spaceName', authenticateToken, getOneSpaceApi);
router.put('/:spaceName', authenticateToken, updateSpaceApi);
router.delete('/:spaceName', authenticateToken, deleteSpaceApi);

export default router;
