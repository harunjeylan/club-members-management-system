import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import getAllSpaceUsersApi from '../api/spaces/users/getAllSpaceUsersApi';
import getOneSpaceUserApi from '../api/spaces/users/getOneSpaceUserApi';
import getAllRolesApi from '@server/api/roles/getAllRolesApi';
import createRoleApi from '@server/api/roles/createRoleApi';

const router = express.Router();
router.get('/', authenticateToken, getAllRolesApi);
router.post('/', authenticateToken, createRoleApi);

export default router;
