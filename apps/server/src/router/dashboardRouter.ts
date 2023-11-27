import adminDashboard from '@server/api/dashboard/adminDashboard';
import publicDashboard from '@server/api/dashboard/publicDashboard';
import { authenticateToken } from '@server/middlewares/authenticateToken';
import express from 'express';

const router = express.Router();
router.get('/super-admins', authenticateToken, adminDashboard);
router.get('/public', publicDashboard);

export default router;
