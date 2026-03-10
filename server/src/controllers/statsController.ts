import type { Request, Response } from 'express';
import User from '../models/User.js';
import Meeting from '../models/Meeting.js';

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const totalUsers = await User.countDocuments();
        const freeUsers = await User.countDocuments({ membership: 'free' });
        const premiumUsers = await User.countDocuments({ membership: 'premium' });

        const meetingsScheduled = await Meeting.countDocuments();
        const meetingsCompleted = await Meeting.countDocuments({ status: 'completed' });
        const meetingsPending = await Meeting.countDocuments({ status: { $in: ['pending', 'scheduled', 'confirmed'] } });

        // Simple mock for active matches as it might require more complex logic
        const activeMatches = Math.floor(totalUsers / 3);

        res.status(200).json({
            totalUsers,
            freeUsers,
            premiumUsers,
            activeMatches,
            meetingsScheduled,
            meetingsCompleted,
            meetingsPending
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getRegistrationTrend = async (req: Request, res: Response) => {
    try {
        // Aggregation for the last 6 months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const trend = await User.aggregate([
            { $match: { createdAt: { $gte: sixMonthsAgo } } },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    users: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formattedTrend = trend.map(item => ({
            month: months[item._id - 1],
            users: item.users
        }));

        res.status(200).json(formattedTrend);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
