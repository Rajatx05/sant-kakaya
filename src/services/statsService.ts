const API_URL = '/api/stats';

export interface DashboardStats {
    totalUsers: number;
    freeUsers: number;
    premiumUsers: number;
    activeMatches: number;
    meetingsScheduled: number;
    meetingsCompleted: number;
    meetingsPending: number;
}

export interface RegistrationTrend {
    month: string;
    users: number;
}

export const statsService = {
    getStats: async (): Promise<DashboardStats | null> => {
        try {
            const response = await fetch(API_URL);
            return await response.json();
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            return null;
        }
    },

    getTrend: async (): Promise<RegistrationTrend[]> => {
        try {
            const response = await fetch(`${API_URL}/trend`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching registration trend:', error);
            return [];
        }
    }
};
