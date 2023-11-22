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

const router = express.Router();
router.get('/', authenticateToken, getAllSpacesApi);
router.post('/', authenticateToken, createSpaceApi);
router.get('/:spaceName', authenticateToken, getOneSpaceApi);

router.get('/:spaceName/users', authenticateToken, getAllSpaceUsersApi);
router.get('/:spaceName/users/:userId', authenticateToken, getOneSpaceUserApi);

router.get('/:spaceName/roles', authenticateToken, getAllSpaceRolesApi);
router.get('/:spaceName/roles/:roleId', authenticateToken, getOneSpaceRoleApi);

router.get('/:spaceName/events', authenticateToken, getAllSpaceEventsApi);
router.get(
  '/:spaceName/events/:eventId',
  authenticateToken,
  getOneSpaceEventApi
);
export default router;
