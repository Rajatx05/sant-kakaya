import type { Request, Response } from 'express';
import Notification from '../models/Notification.js';

export const sendNotification = async (req: Request, res: Response) => {
    try {
        const notifData = req.body;
        const newNotif = new Notification(notifData);
        await newNotif.save();
        res.status(201).json(newNotif);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getNotificationHistory = async (req: Request, res: Response) => {
    try {
        const history = await Notification.find().sort({ sentAt: -1 });
        res.status(200).json(history);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
