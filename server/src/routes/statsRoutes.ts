import express from 'express';
import { getDashboardStats, getRegistrationTrend } from '../controllers/statsController.js';

const router = express.Router();

router.get('/', getDashboardStats);
router.get('/trend', getRegistrationTrend);

export default router;
