import createEventApi from '@server/api/events/createEventApi';
import deleteEventApi from '@server/api/events/deleteEventApi';
import getAllEventsApi from '@server/api/events/getAllEventsApi';
import getAllPublishedEventsApi from '@server/api/events/getAllPublishedEventsApi';
import getOneEventApi from '@server/api/events/getOneEventApi';
import updateEventApi from '@server/api/events/updateEventApi';
import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import getOnePublishedEventApi from '@server/api/events/getOnePublishedEventApi';

const router = express.Router();
router.get('/', authenticateToken, getAllEventsApi);
router.post('/', authenticateToken, createEventApi);
router.put('/', authenticateToken, deleteEventApi);

router.get('/published', getAllPublishedEventsApi);

router.get('/:eventId', authenticateToken, getOneEventApi);
router.put('/:eventId', authenticateToken, updateEventApi);
router.delete('/:eventId', authenticateToken, deleteEventApi);

router.get('/published/:eventId', getOnePublishedEventApi);

export default router;
