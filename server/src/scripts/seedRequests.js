import mongoose from 'mongoose';
import User from '../models/User.js';
import Meeting from '../models/Meeting.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in .env file');
    process.exit(1);
}

const seedRequests = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // 1. Find the target user (the one who will receive requests)
        // Usually, this is the most recently created non-dummy user, 
        // or we can just pick one if any exists.
        const targetUser = await User.findOne({ email: { $not: /example\.com$/ }, role: 'user' }).sort({ createdAt: -1 });

        if (!targetUser) {
            console.error('No real user found to receive requests. Please register an account first.');
            process.exit(1);
        }

        console.log(`Sending requests to: ${targetUser.name} (${targetUser.email})`);

        // 2. Find some dummy users to send requests
        const dummyUsers = await User.find({ email: /example\.com$/ }).limit(5);

        if (dummyUsers.length === 0) {
            console.error('No dummy users found. Please run seedUsers.js first.');
            process.exit(1);
        }

        // 3. Create meeting requests
        const meetings = dummyUsers.map((dummy, index) => ({
            user1Id: dummy._id.toString(), // Sender (Dummy)
            user1Name: dummy.name,
            user1Email: dummy.email,
            user1Phone: dummy.phone || '9999999999',
            user2Id: targetUser._id.toString(), // Receiver (You)
            user2Name: targetUser.name,
            user2Email: targetUser.email,
            user2Phone: targetUser.phone || '9999999999',
            dates: [`2024-11-${10 + index}`],
            timeSlots: [`${5 + (index % 4)}:00 PM`],
            locationType: 'outside',
            address: 'Coffee Shop/Restaurant',
            area: 'Hauz Khas',
            familyCount: 1,
            status: 'pending',
            scheduledOn: new Date().toISOString()
        }));

        await Meeting.insertMany(meetings);
        console.log(`Successfully seeded ${meetings.length} meeting requests!`);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding requests:', error);
        process.exit(1);
    }
};

seedRequests();
