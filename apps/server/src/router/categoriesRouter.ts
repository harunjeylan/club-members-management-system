import createCategoryApi from '@server/api/categories/createCategoryApi';
import deleteCategoryApi from '@server/api/categories/deleteCategoryApi';
import getAllCategoriesApi from '@server/api/categories/getAllCategoriesApi';
import getOneCategoryApi from '@server/api/categories/getOneCategoryApi';
import updateCategoryApi from '@server/api/categories/updateCategoryApi';
import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = express.Router();
router.get('/', authenticateToken, getAllCategoriesApi);
router.post('/', authenticateToken, createCategoryApi);
router.put('/', authenticateToken, deleteCategoryApi);

router.get('/:categoryId', authenticateToken, getOneCategoryApi);
router.put('/:categoryId', authenticateToken, updateCategoryApi);
router.delete('/:categoryId', authenticateToken, deleteCategoryApi);


export default router;
