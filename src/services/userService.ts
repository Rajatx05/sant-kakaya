import { AdminUser } from '../components/adminData';

const API_URL = 'http://localhost:5000/api';

export interface UserData extends AdminUser {
    password?: string;
    role?: 'user' | 'admin';
    bio?: string;
    height?: string;
    weight?: string;
    bodyType?: string;
    caste?: string;
    diet?: string;
    languages?: string;
    hobbies?: string;
    aboutMe?: string;
    organization?: string;
    fatherName?: string;
    fatherOccupation?: string;
    motherName?: string;
    motherOccupation?: string;
    siblings?: string;
    familyIncome?: string;
    partnerPreferences?: {
        ageRange?: string;
        height?: string;
        education?: string;
        occupation?: string;
        location?: string;
    };
}

export const userService = {
    getAllUsers: async (): Promise<UserData[]> => {
        try {
            const response = await fetch(`${API_URL}/users`);
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            // Normalize backend data to frontend interface
            return data.map((user: any) => ({
                ...user,
                id: user._id, // Map MongoDB _id to id
                city: user.location?.split(',')[0]?.trim() || 'N/A',
                state: user.location?.split(',')[1]?.trim() || 'N/A',
            }));
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    },

    registerUser: async (userData: any): Promise<{ success: boolean; message?: string }> => {
        try {
            const response = await fetch(`${API_URL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Registration failed:', data.message);
                return { success: false, message: data.message };
            }

            return { success: true };
        } catch (error: any) {
            console.error('Error registering user:', error);
            return { success: false, message: error.message };
        }
    },

    loginUser: async (email: string, password: string): Promise<UserData | null> => {
        try {
            const response = await fetch(`${API_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) return null;
            return await response.json();
        } catch (error) {
            console.error('Error logging in:', error);
            return null;
        }
    },

    updateMembership: async (email: string, membership: 'free' | 'premium'): Promise<boolean> => {
        try {
            const response = await fetch(`${API_URL}/users/membership`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, membership }),
            });
            return response.ok;
        } catch (error) {
            console.error('Error updating membership:', error);
            return false;
        }
    },

    getUserByEmail: async (email: string): Promise<UserData | null> => {
        try {
            const response = await fetch(`${API_URL}/users/email/${email}`);
            if (!response.ok) return null;
            const user = await response.json();
            return {
                ...user,
                id: user._id,
                city: user.location?.split(',')[0]?.trim() || 'N/A',
                state: user.location?.split(',')[1]?.trim() || 'N/A',
            };
        } catch (error) {
            console.error('Error fetching user by email:', error);
            return null;
        }
    },

    getUserById: async (id: string): Promise<UserData | null> => {
        try {
            const url = `${API_URL}/users/${id}`;
            console.log('[userService] getUserById fetching:', url);
            const response = await fetch(url);
            console.log('[userService] getUserById status:', response.status);
            if (!response.ok) return null;
            const user = await response.json();
            console.log('[userService] getUserById result:', user);
            return {
                ...user,
                id: user._id,
                city: user.location?.split(',')[0]?.trim() || 'N/A',
                state: user.location?.split(',')[1]?.trim() || 'N/A',
            };
        } catch (error) {
            console.error('[userService] Error fetching user by ID:', error);
            return null;
        }
    },

    updateProfile: async (email: string, updateData: Partial<UserData>): Promise<{ success: boolean; message?: string }> => {
        try {
            const response = await fetch(`${API_URL}/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, ...updateData }),
            });

            const data = await response.json();
            if (!response.ok) return { success: false, message: data.message };
            return { success: true };
        } catch (error: any) {
            console.error('Error updating profile:', error);
            return { success: false, message: error.message };
        }
    },

    scheduleMeeting: async (meetingData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/meetings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(meetingData),
            });
            const data = await response.json();
            if (!response.ok) {
                console.error('[userService] scheduleMeeting error:', data);
                throw new Error(data.message || 'Failed to schedule meeting');
            }
            return data;
        } catch (error) {
            console.error('Error in scheduleMeeting:', error);
            throw error;
        }
    },

    getMeetings: async (): Promise<any[]> => {
        try {
            const response = await fetch(`${API_URL}/meetings`);
            if (!response.ok) throw new Error('Failed to fetch meetings');
            return await response.json();
        } catch (error) {
            console.error('Error in getMeetings:', error);
            return [];
        }
    },

    updateMeetingStatus: async (meetingId: string, updateData: any): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/meetings/${meetingId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });
            if (!response.ok) throw new Error('Failed to update meeting status');
            return await response.json();
        } catch (error) {
            console.error('Error in updateMeetingStatus:', error);
            throw error;
        }
    }
};

