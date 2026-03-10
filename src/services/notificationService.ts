export interface AdminNotification {
    id: string | number;
    type: 'broadcast' | 'targeted';
    recipient: string;
    message: string;
    sentAt: string;
}

const API_URL = '/api/notifications';

export const notificationService = {
    getHistory: async (): Promise<AdminNotification[]> => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            return data.map((n: any) => ({
                ...n,
                id: n._id,
                sentAt: n.sentAt
            }));
        } catch (error) {
            console.error('Error fetching notifications:', error);
            return [];
        }
    },

    sendNotification: async (notif: Omit<AdminNotification, 'id' | 'sentAt'>): Promise<AdminNotification | null> => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(notif),
            });
            const data = await response.json();
            return { ...data, id: data._id };
        } catch (error) {
            console.error('Error sending notification:', error);
            return null;
        }
    }
};
