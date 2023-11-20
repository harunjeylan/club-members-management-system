import express from 'express';
import loginApi from '../api/auth/loginApi';
import refreshApi from '../api/auth/refreshApi';

const router = express.Router();
router.post('/login', loginApi);
router.post('/token/refresh', refreshApi);

export default router;
