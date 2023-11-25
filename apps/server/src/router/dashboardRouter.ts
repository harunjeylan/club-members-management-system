import adminDashboard from '@server/api/dashboard/adminDashboard';
import { authenticateToken } from '@server/middlewares/authenticateToken';
import express from 'express';

const router = express.Router();
router.get('/', authenticateToken, adminDashboard);

export default router;
