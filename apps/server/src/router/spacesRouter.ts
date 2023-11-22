import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import getAllSpaceUsersApi from '../api/spaces/users/getAllSpaceUsersApi';
import getOneSpaceUserApi from '../api/spaces/users/getOneSpaceUserApi';
import getAllSpacesApi from '@server/api/spaces/getAllSpacesApi';
import createSpaceApi from '@server/api/spaces/createSpaceApi';

const router = express.Router();
router.get('/', authenticateToken, getAllSpacesApi);
router.post('/', authenticateToken, createSpaceApi);

router.get('/:spaceName/users', authenticateToken, getAllSpaceUsersApi);
router.get('/:spaceName/users/:userId', authenticateToken, getOneSpaceUserApi);

export default router;
