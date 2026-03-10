import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
    type: 'broadcast' | 'targeted';
    recipient: string; // 'All Users' or userId
    message: string;
    sentAt: Date;
}

const NotificationSchema: Schema = new Schema({
    type: { type: String, enum: ['broadcast', 'targeted'], required: true },
    recipient: { type: String, required: true },
    message: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
});

export default mongoose.model<INotification>('Notification', NotificationSchema);
