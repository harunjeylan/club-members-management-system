import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import getAllSpaceUsersApi from '../api/spaces/users/getAllSpaceUsersApi';
import getOneSpaceUserApi from '../api/spaces/users/getOneSpaceUserApi';
import getAllSpacesApi from '@server/api/spaces/getAllSpacesApi';
import createSpaceApi from '@server/api/spaces/createSpaceApi';
import getOneSpaceApi from '@server/api/spaces/getOneSpaceApi';
import getAllSpaceRolesApi from '@server/api/spaces/roles/getAllSpaceRolesApi';
import getOneSpaceRoleApi from '@server/api/spaces/roles/getOneSpaceRoleApi';
import getAllSpaceEventsApi from '@server/api/spaces/events/getAllSpaceEventsApi';
import getOneSpaceEventApi from '@server/api/spaces/events/getOneSpaceEventApi';
import addSpaceUsersToRole from '@server/api/spaces/roles/addSpaceUsersToRole';
import addUsersToSpaceApi from '@server/api/spaces/users/addUsersToSpaceApi';
import removeUsersFromSpaceApi from '@server/api/spaces/users/removeUsersFromSpaceApi';
import updateSpaceApi from '@server/api/spaces/updateSpaceApi';
import deleteSpaceApi from '@server/api/spaces/deleteSpaceApi';
import createSpaceEventApi from '@server/api/spaces/events/createSpaceEventApi';
import deleteSpaceEventApi from '@server/api/spaces/events/deleteSpaceEventApi';
import updateSpaceEventApi from '@server/api/spaces/events/updateSpaceEventApi';

const router = express.Router();
router.get('/', authenticateToken, getAllSpacesApi);
router.post('/', authenticateToken, createSpaceApi);
router.put('/', authenticateToken, deleteSpaceApi);

router.get('/:spaceName', authenticateToken, getOneSpaceApi);
router.put('/:spaceName', authenticateToken, updateSpaceApi);
router.put('/:spaceName', authenticateToken, deleteSpaceApi);

router.get('/:spaceName/users', authenticateToken, getAllSpaceUsersApi);
router.put('/:spaceName/users', authenticateToken, addUsersToSpaceApi);
router.put('/:spaceName/users/remove', authenticateToken, removeUsersFromSpaceApi);
router.get('/:spaceName/users/:userId', authenticateToken, getOneSpaceUserApi);

router.get('/:spaceName/roles', authenticateToken, getAllSpaceRolesApi);
router.get('/:spaceName/roles/:roleId', authenticateToken, getOneSpaceRoleApi);
router.get('/:spaceName/roles/:roleId/users', authenticateToken, addSpaceUsersToRole);

router.get('/:spaceName/events', authenticateToken, getAllSpaceEventsApi);
router.post('/:spaceName/events', authenticateToken, createSpaceEventApi);
router.put('/:spaceName/events', authenticateToken, deleteSpaceEventApi);

router.get('/:spaceName/events/:eventId', authenticateToken, getOneSpaceEventApi);
router.put('/:spaceName/events/:eventId', authenticateToken, updateSpaceEventApi);
router.delete('/:spaceName/events/:eventId', authenticateToken, deleteSpaceEventApi);

export default router;
