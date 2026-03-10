import mongoose, { Schema, Document } from 'mongoose';

export interface IMeeting extends Document {
    user1Id: string;
    user1Name: string;
    user1Email: string;
    user1Phone?: string;
    user2Id: string;
    user2Name: string;
    user2Email: string;
    user2Phone?: string;
    dates: string[];
    timeSlots: string[];
    locationType: 'home' | 'outside';
    address: string;
    area?: string;
    familyCount: number;
    additionalNotes?: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    scheduledOn: string;
    confirmedDate?: string;
    confirmedTime?: string;
}

const MeetingSchema: Schema = new Schema({
    user1Id: { type: String, required: true },
    user1Name: { type: String, required: true },
    user1Email: { type: String, required: true },
    user1Phone: { type: String },
    user2Id: { type: String, required: true },
    user2Name: { type: String, required: true },
    user2Email: { type: String, required: true },
    user2Phone: { type: String },
    dates: { type: [String], required: true },
    timeSlots: { type: [String], required: true },
    locationType: { type: String, enum: ['home', 'outside'], required: true },
    address: { type: String, required: true },
    area: { type: String },
    familyCount: { type: Number, required: true },
    additionalNotes: { type: String },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
    scheduledOn: { type: String, required: true },
    confirmedDate: { type: String },
    confirmedTime: { type: String },
}, { timestamps: true });

// Debug logging to verify schema paths
const modelName = 'Meeting';
console.log(`[Meeting Model] Registering ${modelName} with paths:`, Object.keys(MeetingSchema.paths));

export default mongoose.model<IMeeting>(modelName, MeetingSchema);
