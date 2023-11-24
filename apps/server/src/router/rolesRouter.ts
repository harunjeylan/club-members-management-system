import createRoleApi from '@server/api/roles/createRoleApi';
import getAllRolesApi from '@server/api/roles/getAllRolesApi';
import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import updateRoleApi from '@server/api/roles/updateRoleApi';
import addUsersToRole from '@server/api/roles/addUsersToRole';
import getOneRoleApi from '@server/api/roles/getOneRoleApi';
import removeUsersFromRoleApi from '@server/api/roles/removeUsersFromRoleApi';
import deleteRoleApi from '@server/api/roles/deleteRoleApi';

const router = express.Router();
router.get('/', authenticateToken, getAllRolesApi);
router.post('/', authenticateToken, createRoleApi);
router.put('/', authenticateToken, deleteRoleApi);

router.get('/:roleId', authenticateToken, getOneRoleApi);
router.put('/:roleId', authenticateToken, updateRoleApi);
router.delete('/:roleId', authenticateToken, deleteRoleApi);

router.put('/:roleId/users', authenticateToken, addUsersToRole);
router.put('/:roleId/users/remove', authenticateToken, removeUsersFromRoleApi);

export default router;
