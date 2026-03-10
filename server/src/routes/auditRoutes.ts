import express from 'express';
import { createAuditLog, getAuditLogs } from '../controllers/auditController.js';

const router = express.Router();

router.post('/', createAuditLog);
router.get('/', getAuditLogs);

export default router;
