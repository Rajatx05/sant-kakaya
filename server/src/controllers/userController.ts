import type { Request, Response } from 'express';
import User from '../models/User.js';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        console.log('Registering user with data:', JSON.stringify(userData, null, 2));

        // Check if user exists
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            console.log('Registration failed: User already exists -', userData.email);
            return res.status(400).json({ message: 'User already exists' });
        }

        // Map fields if necessary (similar to frontend userService)
        const newUser = new User({
            ...userData,
            name: userData.fullName || userData.name,
            education: userData.qualification || userData.education,
            status: 'active',
            membership: 'free',
            registeredOn: new Date().toISOString().split('T')[0],
            image: userData.image || `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000000)}?w=400`,
            matchDate: 'Just now',
            compatibility: Math.floor(Math.random() * 15) + 80,
        });

        console.log('Attempting to save new user to MongoDB...');
        await newUser.save();
        console.log('User saved successfully');
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error: any) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json(error);
    }
};

export const updateUserMembership = async (req: Request, res: Response) => {
    try {
        const { email, membership } = req.body;
        const user = await User.findOneAndUpdate(
            { email },
            { membership },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const getUserByEmail = async (req: Request, res: Response) => {
    try {
        const email = req.params.email as string;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const { email, ...updateData } = req.body;
        const user = await User.findOneAndUpdate(
            { email },
            { $set: updateData },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
