import type { Request, Response } from 'express';
import Meeting from '../models/Meeting.js';

export const scheduleMeeting = async (req: Request, res: Response) => {
    try {
        const meetingData = req.body;
        console.log('[meetingController] scheduleMeeting incoming data:', JSON.stringify(meetingData, null, 2));

        // Diagnostic: Check the active model's schema paths
        console.log('[meetingController] Active Meeting Schema Paths:', Object.keys(Meeting.schema.paths));

        const newMeeting = new Meeting({
            ...meetingData,
            status: 'pending',
            scheduledOn: new Date().toISOString()
        });

        await newMeeting.save();
        console.log('[meetingController] Meeting scheduled successfully:', newMeeting._id);
        res.status(201).json(newMeeting);
    } catch (error: any) {
        console.error('[meetingController] Error scheduling meeting:', error);
        res.status(500).json({
            message: error.message,
            errors: error.errors // Include detailed validation errors if present
        });
    }
};

export const getAllMeetings = async (req: Request, res: Response) => {
    try {
        // Sort by scheduledOn descending (latest first)
        const meetings = await Meeting.find().sort({ scheduledOn: -1 });
        res.status(200).json(meetings);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateMeetingStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status, confirmedDate, confirmedTime } = req.body;

        const updateData: any = { status };
        if (confirmedDate) updateData.confirmedDate = confirmedDate;
        if (confirmedTime) updateData.confirmedTime = confirmedTime;

        const updatedMeeting = await Meeting.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedMeeting) {
            return res.status(404).json({ message: 'Meeting not found' });
        }
        res.status(200).json(updatedMeeting);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteMeeting = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedMeeting = await Meeting.findByIdAndDelete(id);
        if (!deletedMeeting) {
            return res.status(404).json({ message: 'Meeting not found' });
        }
        res.status(200).json({ message: 'Meeting deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
