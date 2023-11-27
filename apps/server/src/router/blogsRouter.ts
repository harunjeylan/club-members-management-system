import createBlogApi from '@server/api/blogs/createBlogApi';
import deleteBlogApi from '@server/api/blogs/deleteBlogApi';
import getAllBlogsApi from '@server/api/blogs/getAllBlogsApi';
import getAllPublishedBlogsApi from '@server/api/blogs/getAllPublishedBlogsApi';
import getOneBlogApi from '@server/api/blogs/getOneBlogApi';
import updateBlogApi from '@server/api/blogs/updateBlogApi';
import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import getOnePublishedBlogApi from '@server/api/blogs/getOnePublishedBlogApi';

const router = express.Router();
router.get('/', authenticateToken, getAllBlogsApi);
router.post('/', authenticateToken, createBlogApi);
router.put('/', authenticateToken, deleteBlogApi);

router.get('/published', getAllPublishedBlogsApi);

router.get(
  '/:slug',
  (a, b, next) => {
    console.log(a.params);

    next();
  },
  authenticateToken,
  getOneBlogApi
);
router.put('/:slug', authenticateToken, updateBlogApi);
router.delete('/:slug', authenticateToken, deleteBlogApi);

router.get('/published/:slug', getOnePublishedBlogApi);

export default router;
