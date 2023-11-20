import express from 'express';    
import { authenticateToken } from '../middlewares/authenticateToken';
import getAllSpaceUsersApi from '../api/spaces/users/getAllSpaceUsersApi';
import getOneSpaceUserApi from '../api/spaces/users/getOneSpaceUserApi';

const router = express.Router();
router.get(
  '/:spaceName/users',
  authenticateToken,
  getAllSpaceUsersApi
);

router.get(
  '/:spaceName/users/:userId',
  authenticateToken,
  getOneSpaceUserApi
);

export default router;
