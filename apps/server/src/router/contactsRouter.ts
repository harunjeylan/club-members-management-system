import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import getAllContactsApi from '@server/api/contact/getAllBlogsApi';
import deleteContactApi from '@server/api/contact/deleteBlogApi';
import createContactApi from '@server/api/contact/createBlogApi';

const router = express.Router();
router.get('/', authenticateToken, getAllContactsApi);
router.post('/', createContactApi);
router.put('/', authenticateToken, deleteContactApi);
router.delete('/:contactId', authenticateToken, deleteContactApi);

export default router;
