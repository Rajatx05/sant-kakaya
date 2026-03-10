import type { Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || '',
    key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { amount, currency = 'INR', receipt } = req.body;
        console.log('--- Order Creation Start ---');
        console.log('Request Body:', req.body);

        if (!amount) {
            console.error('Order creation failed: Amount is required');
            return res.status(400).json({ message: 'Amount is required' });
        }

        const options = {
            amount: Math.round(amount * 100), // amount in the smallest currency unit (paise for INR), using round to avoid float precision issues
            currency,
            receipt: receipt || `receipt_${Date.now()}`,
        };

        console.log('Razorpay Options:', options);

        const order = await razorpay.orders.create(options);
        console.log('Razorpay Order Created Successfully:', order.id);
        res.status(201).json(order);
    } catch (error: any) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ message: error.message });
    }
};

export const verifyPayment = async (req: Request, res: Response) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || '')
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            return res.status(200).json({ message: "Payment verified successfully", success: true });
        } else {
            return res.status(400).json({ message: "Invalid signature sent!", success: false });
        }
    } catch (error: any) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ message: error.message });
    }
};
