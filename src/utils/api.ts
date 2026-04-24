export interface Badge {
  id: string;
  skillName: string;
  issuer: string;
  category: string;
  timestamp: number;
}

const API_URL = 'http://localhost:3001/api';

export const getBadges = async (walletAddress: string): Promise<Badge[]> => {
  try {
    const res = await fetch(`${API_URL}/badges/${walletAddress}`);
    return await res.json();
  } catch (error) {
    console.error('Error fetching badges', error);
    return [];
  }
};

export const saveBadge = async (walletAddress: string, badge: Omit<Badge, 'id' | 'timestamp'>): Promise<Badge | null> => {
  try {
    const res = await fetch(`${API_URL}/badges`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress, ...badge })
    });
    return await res.json();
  } catch (error) {
    console.error('Error saving badge', error);
    return null;
  }
};

export const getStats = async (): Promise<{ totalBadges: number, uniqueUsers: number }> => {
  try {
    const res = await fetch(`${API_URL}/stats`);
    return await res.json();
  } catch (error) {
    console.error('Error fetching stats', error);
    return { totalBadges: 0, uniqueUsers: 0 };
  }
};
