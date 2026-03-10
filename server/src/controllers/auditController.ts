import type { Request, Response } from 'express';
import AuditLog from '../models/AuditLog.js';

export const createAuditLog = async (req: Request, res: Response) => {
    try {
        const logData = req.body;
        const newLog = new AuditLog(logData);
        await newLog.save();
        res.status(201).json(newLog);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAuditLogs = async (req: Request, res: Response) => {
    try {
        const logs = await AuditLog.find().sort({ timestamp: -1 }).limit(100);
        res.status(200).json(logs);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
