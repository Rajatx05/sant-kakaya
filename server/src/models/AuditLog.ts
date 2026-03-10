import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
    timestamp: Date;
    action: string;
    target: string;
    details: string;
    adminEmail: string;
}

const AuditLogSchema: Schema = new Schema({
    timestamp: { type: Date, default: Date.now },
    action: { type: String, required: true },
    target: { type: String, required: true },
    details: { type: String },
    adminEmail: { type: String, required: true },
});

export default mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
