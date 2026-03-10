import express from 'express';
import { sendNotification, getNotificationHistory } from '../controllers/notificationController.js';

const router = express.Router();

router.post('/', sendNotification);
router.get('/', getNotificationHistory);

export default router;
