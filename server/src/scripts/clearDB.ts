import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const clearDatabase = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            console.error('MONGODB_URI is not defined in .env');
            process.exit(1);
        }

        await mongoose.connect(uri);
        console.log('Connected to MongoDB.');

        const result = await User.deleteMany({});
        console.log(`Deleted ${result.deletedCount} users.`);

        await mongoose.connection.close();
        console.log('Database connection closed.');
        process.exit(0);
    } catch (error) {
        console.error('Error clearing database:', error);
        process.exit(1);
    }
};

clearDatabase();
