export interface AuditEntry {
    id: string | number;
    timestamp: string;
    action: string;
    target: string;
    details: string;
    adminEmail: string;
}

const API_URL = '/api/audit-logs';

export const auditService = {
    getAllLogs: async (): Promise<AuditEntry[]> => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            return data.map((log: any) => ({
                ...log,
                id: log._id
            }));
        } catch (error) {
            console.error('Error fetching audit logs:', error);
            return [];
        }
    },

    createLog: async (log: Omit<AuditEntry, 'id' | 'timestamp'>): Promise<AuditEntry | null> => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(log),
            });
            const data = await response.json();
            return { ...data, id: data._id };
        } catch (error) {
            console.error('Error creating audit log:', error);
            return null;
        }
    }
};
