import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import getAllEventsApi from '@server/api/events/getAllEventsApi';
import createEventApi from '@server/api/events/createEventApi';
import deleteEventApi from '@server/api/events/deleteEventApi';
import getOneEventApi from '@server/api/events/getOneEventApi';
import updateEventApi from '@server/api/events/updateEventApi';

const router = express.Router();
router.get('/', authenticateToken, getAllEventsApi);
router.post(
  '/',
  authenticateToken,
  
  createEventApi
);
router.put('/', authenticateToken, deleteEventApi);

router.get('/:eventId', authenticateToken, getOneEventApi);
router.put('/:eventId', authenticateToken, updateEventApi);
router.delete('/:eventId', authenticateToken, deleteEventApi);

export default router;
