export interface Badge {
  id: string;
  skillName: string;
  issuer: string;
  category: string;
  timestamp: number;
}

export const getBadges = (walletAddress: string): Badge[] => {
  const data = localStorage.getItem(`badges_${walletAddress}`);
  return data ? JSON.parse(data) : [];
};

export const saveBadge = (walletAddress: string, badge: Omit<Badge, 'id' | 'timestamp'>): Badge => {
  const badges = getBadges(walletAddress);
  const newBadge: Badge = {
    ...badge,
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(7),
    timestamp: Date.now(),
  };
  badges.push(newBadge);
  localStorage.setItem(`badges_${walletAddress}`, JSON.stringify(badges));
  return newBadge;
};
