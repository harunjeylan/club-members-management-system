import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import getAllUsersApi from '../api/users/getAllUsersApi';
import getCurrentUserApi from '../api/users/getCurrentUserApi';
import getOneUserApi from '../api/users/getOneUserApi';
import registerCurrentUserApi from '../api/users/registerCurrentUserApi';
import updateCurrentUserApi from '../api/users/updateCurrentUserApi';
import deleteCurrentUserApi from '../api/users/deleteCurrentUserApi';
import updateUserApi from '@server/api/users/updateUserApi';

const router = express.Router();
router.get('/', authenticateToken, getAllUsersApi);
router.post('/register', registerCurrentUserApi);
router.put('/me', authenticateToken, updateCurrentUserApi);
router.get('/me', authenticateToken, getCurrentUserApi);
router.delete('/me', authenticateToken, deleteCurrentUserApi);
router.get('/:userId', authenticateToken, getOneUserApi);
router.put('/:userId', authenticateToken, updateUserApi);

export default router;
