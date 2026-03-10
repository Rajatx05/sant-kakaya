import { AdminMeeting } from '../components/adminData';

const API_URL = 'http://localhost:5000/api';

export const meetingService = {
    getAllMeetings: async (): Promise<AdminMeeting[]> => {
        try {
            const response = await fetch(`${API_URL}/meetings`);
            if (!response.ok) throw new Error('Failed to fetch meetings');
            const data = await response.json();
            return data.map((meeting: any) => ({
                ...meeting,
                id: meeting._id,
            }));
        } catch (error) {
            console.error('Error fetching meetings:', error);
            return [];
        }
    },

    scheduleMeeting: async (meetingData: any): Promise<boolean> => {
        try {
            const response = await fetch(`${API_URL}/meetings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(meetingData),
            });
            return response.ok;
        } catch (error) {
            console.error('Error scheduling meeting:', error);
            return false;
        }
    },

    updateStatus: async (id: string, status: string): Promise<boolean> => {
        try {
            const response = await fetch(`${API_URL}/meetings/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });
            return response.ok;
        } catch (error) {
            console.error('Error updating meeting status:', error);
            return false;
        }
    }
};
