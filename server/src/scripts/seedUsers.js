import mongoose from 'mongoose';
import User from '../models/User.js';
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

const indianCities = [
    'Mumbai, Maharashtra', 'Delhi, Delhi', 'Bangalore, Karnataka',
    'Chennai, Tamil Nadu', 'Kolkata, West Bengal', 'Hyderabad, Telangana',
    'Ahmedabad, Gujarat', 'Pune, Maharashtra', 'Jaipur, Rajasthan',
    'Lucknow, Uttar Pradesh', 'Kanpur, Uttar Pradesh', 'Nagpur, Maharashtra',
    'Indore, Madhya Pradesh', 'Thane, Maharashtra', 'Bhopal, Madhya Pradesh'
];

const occupations = [
    'Software Engineer', 'Doctor', 'Chartered Accountant', 'Business Owner',
    'Marketing Manager', 'School Teacher', 'Content Writer', 'Graphic Designer',
    'Bank Manager', 'HR Specialist', 'Fashion Designer', 'Architect',
    'Civil Engineer', 'Data Scientist', 'Interior Designer'
];

const organizations = [
    'TCS', 'Infosys', 'Google India', 'Microsoft', 'HDFC Bank', 'ICICI Bank',
    'Reliance Industries', 'Tata Motors', 'Amazon', 'Adobe', 'Samsung', 'Self Employed'
];

const educations = [
    'B.Tech', 'MBBS', 'CA', 'MBA', 'M.Tech', 'B.Com', 'M.A.', 'B.A.', 'B.Sc', 'M.Sc'
];

const religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Jain', 'Buddhist', 'Parsi'];

const dummyUsers = [
    { name: 'Aditi Sharma', gender: 'female', age: 24, compatibility: 92, image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400' },
    { name: 'Priya Verma', gender: 'female', age: 26, compatibility: 88, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
    { name: 'Rohan Gupta', gender: 'male', age: 28, compatibility: 72, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' },
    { name: 'Ishita Iyer', gender: 'female', age: 25, compatibility: 95, image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400' },
    { name: 'Arjun Mehta', gender: 'male', age: 27, compatibility: 65, image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400' },
    { name: 'Sanya Malhotra', gender: 'female', age: 23, compatibility: 81, image: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=400' },
    { name: 'Vikram Singh', gender: 'male', age: 30, compatibility: 45, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' },
    { name: 'Ananya Pandey', gender: 'female', age: 24, compatibility: 89, image: 'https://images.unsplash.com/photo-1529139513055-07f9024425c6?w=400' },
    { name: 'Rahul Khanna', gender: 'male', age: 29, compatibility: 78, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400' },
    { name: 'Sneha Reddy', gender: 'female', age: 27, compatibility: 91, image: 'https://images.unsplash.com/photo-1600687436073-86a81c9b0daa?w=400' },
    { name: 'Kabir Das', gender: 'male', age: 26, compatibility: 55, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
    { name: 'Kavya Nair', gender: 'female', age: 25, compatibility: 84, image: 'https://images.unsplash.com/photo-1623631140622-cca64af89fff?w=400' },
    { name: 'Siddharth Roy', gender: 'male', age: 31, compatibility: 68, image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400' },
    { name: 'Mehak Kaur', gender: 'female', age: 22, compatibility: 76, image: 'https://images.unsplash.com/photo-1616683693504-3ee7e13e9d92?w=400' },
    { name: 'Deepak Joshi', gender: 'male', age: 28, compatibility: 40, image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400' },
    { name: 'Riya Sen', gender: 'female', age: 25, compatibility: 87, image: 'https://images.unsplash.com/photo-1580746453801-37b0bc56f3b4?w=400' },
    { name: 'Manav Jain', gender: 'male', age: 27, compatibility: 74, image: 'https://images.unsplash.com/photo-1504257404462-9226ee3017cf?w=400' },
    { name: 'Tara Sutaria', gender: 'female', age: 24, compatibility: 93, image: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=400' },
    { name: 'Varun Dhawan', gender: 'male', age: 29, compatibility: 50, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400' },
    { name: 'Sara Ali', gender: 'female', age: 25, compatibility: 80, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400' },
    { name: 'Ayushmann Khurrana', gender: 'male', age: 32, compatibility: 60, image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400' },
    { name: 'Janhvi Kapoor', gender: 'female', age: 23, compatibility: 85, image: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400' },
    { name: 'Kartik Aaryan', gender: 'male', age: 28, compatibility: 70, image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400' },
    { name: 'Kiara Advani', gender: 'female', age: 26, compatibility: 90, image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=400' },
    { name: 'Ranbir Kapoor', gender: 'male', age: 33, compatibility: 42, image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400' },
    { name: 'Alia Bhatt', gender: 'female', age: 24, compatibility: 94, image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400' },
    { name: 'Tiger Shroff', gender: 'male', age: 27, compatibility: 58, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' },
    { name: 'Disha Patani', gender: 'female', age: 25, compatibility: 82, image: 'https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?w=400' },
    { name: 'Ranveer Singh', gender: 'male', age: 31, compatibility: 48, image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400' },
    { name: 'Deepika Padukone', gender: 'female', age: 28, compatibility: 86, image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400' }
];

const seedUsers = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing dummy users to avoid duplicates and ensure all have full details
        await User.deleteMany({ role: 'user', email: /@example\.com$/ });
        console.log('Cleared existing dummy users');

        const usersToInsert = dummyUsers.map(user => {
            const cityState = indianCities[Math.floor(Math.random() * indianCities.length)];
            const religion = religions[Math.floor(Math.random() * religions.length)];
            const age = user.age;
            const surname = user.name.split(' ')[1];

            return {
                ...user,
                email: `${user.name.toLowerCase().replace(/\s/g, '.')}@example.com`,
                password: 'password123',
                phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
                location: cityState,
                education: educations[Math.floor(Math.random() * educations.length)],
                occupation: occupations[Math.floor(Math.random() * occupations.length)],
                organization: organizations[Math.floor(Math.random() * organizations.length)],
                income: `${Math.floor(5 + Math.random() * 25)} LPA`,
                religion: religion,
                caste: religion === 'Hindu' ? ['Brahmin', 'Kshatriya', 'Vaishya', 'Kayastha'][Math.floor(Math.random() * 4)] :
                    religion === 'Muslim' ? ['Sunni', 'Shia', 'Pathan'][Math.floor(Math.random() * 3)] : 'Open',
                motherTongue: religion === 'Muslim' ? 'Urdu' :
                    religion === 'Hindu' && Math.random() > 0.5 ? 'Hindi' :
                        ['Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'English'][Math.floor(Math.random() * 6)],
                maritalStatus: 'Never Married',
                status: 'active',
                membership: Math.random() > 0.8 ? 'premium' : 'free',
                role: 'user',
                registeredOn: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
                matchDate: 'Recently',
                dateOfBirth: `${2026 - age}-05-15`,
                bio: `Hi, I am ${user.name.split(' ')[0]}. I am professional, family-oriented, and looking for someone special to share life with.`,
                height: `${5 + Math.floor(Math.random() * 2)}'${Math.floor(Math.random() * 12)}"`,
                weight: `${50 + Math.floor(Math.random() * 30)} kg`,
                bodyType: ['Slim', 'Athletic', 'Average', 'Heavy'][Math.floor(Math.random() * 4)],
                bloodGroup: ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'][Math.floor(Math.random() * 8)],
                horoscope: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'][Math.floor(Math.random() * 12)],
                fatherName: `Mr. R. K. ${surname}`,
                fatherOccupation: ['Retired Govt Officer', 'Business Owner', 'Senior Manager', 'Consultant'][Math.floor(Math.random() * 4)],
                motherName: `Mrs. S. ${surname}`,
                motherOccupation: ['Homemaker', 'Former Teacher', 'Bank Manager', 'Artist'][Math.floor(Math.random() * 4)],
                siblings: `${Math.floor(Math.random() * 2 + 1)} siblings`,
                familyIncome: `${Math.floor(10 + Math.random() * 50)} LPA`,
                diet: ['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Vegan'][Math.floor(Math.random() * 4)],
                languages: religion === 'Muslim' ? 'Hindi, Urdu, English' : 'Hindi, English, ' + cityState.split(',')[0],
                hobbies: ['Photography', 'Cooking', 'Hiking', 'Reading', 'Music', 'Travel', 'Painting', 'Yoga'][Math.floor(Math.random() * 8)] + ', ' + ['Gaming', 'Dancing', 'Movies', 'Volunteering'][Math.floor(Math.random() * 4)],
                partnerPreferences: {
                    ageRange: `${age - 4} - ${age + 2} years`,
                    height: "5'0\" - 6'2\"",
                    education: 'Post Graduate / Professional Degree',
                    occupation: 'Working Professional',
                    location: cityState.split(',')[1].trim() + ' or nearby'
                }
            };
        });

        await User.insertMany(usersToInsert);
        console.log(`Successfully seeded ${usersToInsert.length} user accounts with full details!`);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedUsers();
