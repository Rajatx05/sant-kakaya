import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    age: number;
    gender: string;
    phone: string;
    location: string;
    education: string;
    occupation: string;
    income: string;
    religion: string;
    caste: string;
    motherTongue: string;
    maritalStatus: string;
    status: 'active' | 'inactive';
    membership: 'free' | 'premium' | 'vip';
    role: 'user' | 'admin';
    registeredOn: string;
    image: string;
    matchDate: string;
    compatibility: number;
    dateOfBirth?: string;
    bio?: string;
    height?: string;
    weight?: string;
    bodyType?: string;
    bloodGroup?: string;
    horoscope?: string;
    organization?: string;
    fatherName?: string;
    fatherOccupation?: string;
    motherName?: string;
    motherOccupation?: string;
    siblings?: string;
    familyIncome?: string;
    diet?: string;
    languages?: string;
    hobbies?: string;
    partnerPreferences?: {
        ageRange?: string;
        height?: string;
        education?: string;
        occupation?: string;
        location?: string;
    };
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    age: { type: Number },
    gender: { type: String },
    phone: { type: String },
    location: { type: String },
    education: { type: String },
    occupation: { type: String },
    income: { type: String },
    religion: { type: String },
    caste: { type: String },
    motherTongue: { type: String },
    maritalStatus: { type: String },
    status: { type: String, default: 'active' },
    membership: { type: String, default: 'free' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    registeredOn: { type: String },
    image: { type: String },
    matchDate: { type: String },
    compatibility: { type: Number },
    dateOfBirth: { type: String },
    bio: { type: String },
    height: { type: String },
    weight: { type: String },
    bodyType: { type: String },
    bloodGroup: { type: String },
    horoscope: { type: String },
    organization: { type: String },
    fatherName: { type: String },
    fatherOccupation: { type: String },
    motherName: { type: String },
    motherOccupation: { type: String },
    siblings: { type: String },
    familyIncome: { type: String },
    diet: { type: String },
    languages: { type: String },
    hobbies: { type: String },
    partnerPreferences: {
        ageRange: { type: String },
        height: { type: String },
        education: { type: String },
        occupation: { type: String },
        location: { type: String },
    },
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
