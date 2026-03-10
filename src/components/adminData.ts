// ============================================================
// ADMIN DATA STORE — Mock data for Admin Panel
// This file centralizes all mock data used by the admin panel.
// In a real app, these would be fetched via REST API.
// ============================================================

export interface AdminUser {
    id: string | number;
    name: string;
    email: string;
    phone: string;
    membership: 'free' | 'premium';
    status: 'active' | 'inactive';
    registeredOn: string;
    city: string;
    state: string;
    age: number;
    gender: string;
    religion: string;
    occupation: string;
    education?: string;     // Added for Matches display
    image?: string;         // Added for Matches display
    compatibility?: number; // Added for Matches display
    matchDate?: string;     // Added for Matches display
    premiumExpiry?: string; // Only for premium users
    paymentStatus?: 'paid' | 'pending' | 'failed';
}

export interface AdminMeeting {
    id: number;
    user1Id: number;
    user1Name: string;
    user1Email: string;
    user1Phone: string;
    user2Id: number;
    user2Name: string;
    user2Email: string;
    user2Phone: string;
    date: string;
    time: string;
    location: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    scheduledOn: string;
}

export interface AuditLog {
    id: number;
    timestamp: string;
    action: string;
    target: string;
    admin: string;
    details: string;
}

export interface AdminNotification {
    id: number;
    type: 'broadcast' | 'targeted';
    recipient: string; // 'All Users' or specific user name
    message: string;
    sentAt: string;
    sentBy: string;
}

// ============================================================
// MOCK USERS
// ============================================================
export const MOCK_USERS: AdminUser[] = [
    {
        id: 1, name: 'Priya Sharma', email: 'priya.sharma@gmail.com', phone: '+91 98765 43210',
        membership: 'premium', status: 'active', registeredOn: '2024-10-15',
        city: 'Mumbai', state: 'Maharashtra', age: 26, gender: 'Female',
        religion: 'Hindu', occupation: 'Marketing Manager',
        premiumExpiry: '2025-03-10', paymentStatus: 'paid',
    },
    {
        id: 2, name: 'Ananya Patel', email: 'ananya.patel@gmail.com', phone: '+91 97654 32109',
        membership: 'free', status: 'active', registeredOn: '2024-11-01',
        city: 'Ahmedabad', state: 'Gujarat', age: 24, gender: 'Female',
        religion: 'Hindu', occupation: 'Software Developer',
    },
    {
        id: 3, name: 'Sneha Reddy', email: 'sneha.reddy@gmail.com', phone: '+91 96543 21098',
        membership: 'premium', status: 'active', registeredOn: '2024-09-20',
        city: 'Hyderabad', state: 'Telangana', age: 27, gender: 'Female',
        religion: 'Hindu', occupation: 'Chartered Accountant',
        premiumExpiry: '2025-03-05', paymentStatus: 'paid',
    },
    {
        id: 4, name: 'Kavya Menon', email: 'kavya.menon@gmail.com', phone: '+91 95432 10987',
        membership: 'free', status: 'active', registeredOn: '2024-11-10',
        city: 'Chennai', state: 'Tamil Nadu', age: 25, gender: 'Female',
        religion: 'Hindu', occupation: 'Research Scientist',
    },
    {
        id: 5, name: 'Riya Verma', email: 'riya.verma@gmail.com', phone: '+91 94321 09876',
        membership: 'premium', status: 'active', registeredOn: '2024-10-05',
        city: 'Delhi', state: 'Delhi', age: 27, gender: 'Female',
        religion: 'Hindu', occupation: 'Content Writer',
        premiumExpiry: '2025-03-02', paymentStatus: 'paid',
    },
    {
        id: 6, name: 'Rahul Gupta', email: 'rahul.gupta@gmail.com', phone: '+91 93210 98765',
        membership: 'free', status: 'inactive', registeredOn: '2024-08-12',
        city: 'Pune', state: 'Maharashtra', age: 29, gender: 'Male',
        religion: 'Hindu', occupation: 'Engineer',
    },
    {
        id: 7, name: 'Arjun Singh', email: 'arjun.singh@gmail.com', phone: '+91 92109 87654',
        membership: 'premium', status: 'active', registeredOn: '2024-09-01',
        city: 'Jaipur', state: 'Rajasthan', age: 31, gender: 'Male',
        religion: 'Hindu', occupation: 'Doctor',
        premiumExpiry: '2025-04-15', paymentStatus: 'paid',
    },
    {
        id: 8, name: 'Divya Singh', email: 'divya.singh@gmail.com', phone: '+91 91098 76543',
        membership: 'free', status: 'active', registeredOn: '2024-11-20',
        city: 'Bangalore', state: 'Karnataka', age: 25, gender: 'Female',
        religion: 'Hindu', occupation: 'UX Designer',
    },
    {
        id: 9, name: 'Meera Nair', email: 'meera.nair@gmail.com', phone: '+91 90987 65432',
        membership: 'premium', status: 'active', registeredOn: '2024-07-18',
        city: 'Kochi', state: 'Kerala', age: 28, gender: 'Female',
        religion: 'Hindu', occupation: 'Business Analyst',
        premiumExpiry: '2025-02-28', paymentStatus: 'paid',
    },
    {
        id: 10, name: 'Vikram Malhotra', email: 'vikram.m@gmail.com', phone: '+91 89876 54321',
        membership: 'free', status: 'active', registeredOn: '2024-12-01',
        city: 'Chandigarh', state: 'Punjab', age: 30, gender: 'Male',
        religion: 'Sikh', occupation: 'Entrepreneur',
    },
    {
        id: 11, name: 'Pooja Desai', email: 'pooja.desai@gmail.com', phone: '+91 88765 43210',
        membership: 'premium', status: 'active', registeredOn: '2024-10-28',
        city: 'Surat', state: 'Gujarat', age: 25, gender: 'Female',
        religion: 'Jain', occupation: 'HR Manager',
        premiumExpiry: '2025-05-01', paymentStatus: 'paid',
    },
    {
        id: 12, name: 'Karan Mehta', email: 'karan.mehta@gmail.com', phone: '+91 87654 32109',
        membership: 'free', status: 'inactive', registeredOn: '2024-06-15',
        city: 'Bhopal', state: 'Madhya Pradesh', age: 33, gender: 'Male',
        religion: 'Hindu', occupation: 'Teacher',
    },
    {
        id: 13, name: 'Neha Kulkarni', email: 'neha.kulkarni@gmail.com', phone: '+91 86543 21098',
        membership: 'free', status: 'active', registeredOn: '2025-01-05',
        city: 'Nagpur', state: 'Maharashtra', age: 23, gender: 'Female',
        religion: 'Hindu', occupation: 'Student',
    },
    {
        id: 14, name: 'Suresh Kumar', email: 'suresh.kumar@gmail.com', phone: '+91 85432 10987',
        membership: 'premium', status: 'active', registeredOn: '2024-11-15',
        city: 'Coimbatore', state: 'Tamil Nadu', age: 28, gender: 'Male',
        religion: 'Hindu', occupation: 'Software Engineer',
        premiumExpiry: '2025-02-25', paymentStatus: 'pending',
    },
    {
        id: 15, name: 'Anjali Bose', email: 'anjali.bose@gmail.com', phone: '+91 84321 09876',
        membership: 'free', status: 'active', registeredOn: '2025-01-20',
        city: 'Kolkata', state: 'West Bengal', age: 26, gender: 'Female',
        religion: 'Hindu', occupation: 'Journalist',
    },
];

// ============================================================
// MOCK MEETINGS
// ============================================================
export const MOCK_MEETINGS: AdminMeeting[] = [
    {
        id: 1,
        user1Id: 7, user1Name: 'Arjun Singh', user1Email: 'arjun.singh@gmail.com', user1Phone: '+91 92109 87654',
        user2Id: 1, user2Name: 'Priya Sharma', user2Email: 'priya.sharma@gmail.com', user2Phone: '+91 98765 43210',
        date: '2025-03-05', time: '6:00 PM - 8:00 PM', location: 'Bandra, Mumbai',
        status: 'confirmed', scheduledOn: '2025-02-20',
    },
    {
        id: 2,
        user1Id: 10, user1Name: 'Vikram Malhotra', user1Email: 'vikram.m@gmail.com', user1Phone: '+91 89876 54321',
        user2Id: 5, user2Name: 'Riya Verma', user2Email: 'riya.verma@gmail.com', user2Phone: '+91 94321 09876',
        date: '2025-03-10', time: '5:00 PM - 7:00 PM', location: 'Connaught Place, Delhi',
        status: 'pending', scheduledOn: '2025-02-22',
    },
    {
        id: 3,
        user1Id: 14, user1Name: 'Suresh Kumar', user1Email: 'suresh.kumar@gmail.com', user1Phone: '+91 85432 10987',
        user2Id: 4, user2Name: 'Kavya Menon', user2Email: 'kavya.menon@gmail.com', user2Phone: '+91 95432 10987',
        date: '2025-02-15', time: '4:00 PM - 6:00 PM', location: 'Anna Nagar, Chennai',
        status: 'completed', scheduledOn: '2025-02-08',
    },
    {
        id: 4,
        user1Id: 11, user1Name: 'Pooja Desai', user1Email: 'pooja.desai@gmail.com', user1Phone: '+91 88765 43210',
        user2Id: 13, user2Name: 'Neha Kulkarni', user2Email: 'neha.kulkarni@gmail.com', user2Phone: '+91 86543 21098',
        date: '2025-03-15', time: '3:00 PM - 5:00 PM', location: 'Law Garden, Ahmedabad',
        status: 'pending', scheduledOn: '2025-02-24',
    },
    {
        id: 5,
        user1Id: 2, user1Name: 'Ananya Patel', user1Email: 'ananya.patel@gmail.com', user1Phone: '+91 97654 32109',
        user2Id: 8, user2Name: 'Divya Singh', user2Email: 'divya.singh@gmail.com', user2Phone: '+91 91098 76543',
        date: '2025-02-10', time: '5:30 PM - 7:30 PM', location: 'Indiranagar, Bangalore',
        status: 'cancelled', scheduledOn: '2025-02-05',
    },
    {
        id: 6,
        user1Id: 9, user1Name: 'Meera Nair', user1Email: 'meera.nair@gmail.com', user1Phone: '+91 90987 65432',
        user2Id: 3, user2Name: 'Sneha Reddy', user2Email: 'sneha.reddy@gmail.com', user2Phone: '+91 96543 21098',
        date: '2025-03-20', time: '6:00 PM - 8:00 PM', location: 'Marine Drive, Kochi',
        status: 'pending', scheduledOn: '2025-02-26',
    },
];

// ============================================================
// DASHBOARD STATS COMPUTATION
// ============================================================
export interface DashboardStats {
    totalUsers: number;
    freeUsers: number;
    premiumUsers: number;
    activeMatches: number;
    meetingsScheduled: number;
    meetingsCompleted: number;
    meetingsPending: number;
}

export function getDashboardStats(): DashboardStats {
    return {
        totalUsers: MOCK_USERS.length,
        freeUsers: MOCK_USERS.filter(u => u.membership === 'free').length,
        premiumUsers: MOCK_USERS.filter(u => u.membership === 'premium').length,
        activeMatches: 24, // mock active AI matches
        meetingsScheduled: MOCK_MEETINGS.filter(m => m.status === 'confirmed').length,
        meetingsCompleted: MOCK_MEETINGS.filter(m => m.status === 'completed').length,
        meetingsPending: MOCK_MEETINGS.filter(m => m.status === 'pending').length,
    };
}

// Registration trend data for chart
export const REGISTRATION_TREND = [
    { month: 'Sep', users: 3 },
    { month: 'Oct', users: 4 },
    { month: 'Nov', users: 3 },
    { month: 'Dec', users: 2 },
    { month: 'Jan', users: 2 },
    { month: 'Feb', users: 1 },
];

// ============================================================
// ADMIN CREDENTIALS (simulated hashed storage)
// In a real app this would be bcrypt hashed and stored server-side
// ============================================================
export const ADMIN_CREDENTIALS = {
    email: 'rajatthakare222@gmail.com',
    password: '12121212',
    name: 'Rajat Thakare',
};

// ============================================================
// SAMPLE EXPLORER DATA (read-only user profiles for Safe View Mode)
// ============================================================
export const EXPLORER_PROFILES = MOCK_USERS.slice(0, 8).map(u => ({
    ...u,
    bio: `Hi, I am ${u.name.split(' ')[0]}. I am a ${u.occupation} from ${u.city}, ${u.state}. I value family, culture, and a harmonious life together.`,
    preferences: {
        ageRange: `${u.age - 4} - ${u.age + 4}`,
        religion: u.religion,
        location: u.state,
        education: 'Graduate or above',
    },
    aiMatches: [
        { name: 'Match A', compatibility: Math.floor(Math.random() * 15) + 80 },
        { name: 'Match B', compatibility: Math.floor(Math.random() * 15) + 75 },
        { name: 'Match C', compatibility: Math.floor(Math.random() * 10) + 70 },
    ],
}));
