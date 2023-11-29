import createForumApi from '@server/api/forums/createForumApi';
import deleteForumApi from '@server/api/forums/deleteForumApi';
import getAllForumsApi from '@server/api/forums/getAllForumsApi';
import getOneForumApi from '@server/api/forums/getOneForumApi';
import updateForumApi from '@server/api/forums/updateForumApi';
import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = express.Router();
router.get('/', authenticateToken, getAllForumsApi);
router.post('/', authenticateToken, createForumApi);
router.put('/', authenticateToken, deleteForumApi);


router.get('/:forumId', authenticateToken, getOneForumApi);
router.put('/:forumId', authenticateToken, updateForumApi);
router.delete('/:forumId', authenticateToken, deleteForumApi);

export default router;
