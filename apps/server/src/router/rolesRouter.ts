import createRoleApi from '@server/api/roles/createRoleApi';
import getAllRolesApi from '@server/api/roles/getAllRolesApi';
import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import updateRoleApi from '@server/api/roles/updateRoleApi';
import addUsersToRole from '@server/api/roles/addUsersToRole';

const router = express.Router();
router.get('/', authenticateToken, getAllRolesApi);
router.post('/', authenticateToken, createRoleApi);
router.put('/:roleId', authenticateToken, updateRoleApi);
router.put('/:roleId/users', authenticateToken, addUsersToRole);

export default router;
