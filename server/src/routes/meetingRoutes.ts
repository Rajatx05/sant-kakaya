import express from 'express';
import { scheduleMeeting, getAllMeetings, updateMeetingStatus, deleteMeeting } from '../controllers/meetingController.js';

const router = express.Router();

router.post('/', scheduleMeeting);
router.get('/', getAllMeetings);
router.patch('/:id', updateMeetingStatus);
router.delete('/:id', deleteMeeting);

export default router;
