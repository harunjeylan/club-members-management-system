import createRoleApi from '@server/api/roles/createRoleApi';
import getAllRolesApi from '@server/api/roles/getAllRolesApi';
import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import updateRoleApi from '@server/api/roles/updateRoleApi';
import addUsersToRole from '@server/api/roles/addUsersToRole';
import getOneRoleApi from '@server/api/roles/getOneRoleApi';
import removeUsersFromRoleApi from '@server/api/roles/removeUsersFromRoleApi';

const router = express.Router();
router.get('/', authenticateToken, getAllRolesApi);
router.post('/', authenticateToken, createRoleApi);
router.get('/:roleId', authenticateToken, getOneRoleApi);
router.put('/:roleId', authenticateToken, updateRoleApi);
router.put('/:roleId/users', authenticateToken, addUsersToRole);
router.put('/:roleId/users/remove', authenticateToken, removeUsersFromRoleApi);

export default router;
