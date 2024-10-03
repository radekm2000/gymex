export const UserBadgeType = {
  NOVICE: 'Novice',
  WARRIOR: 'Warrior',
  ELITE: 'Elite',
  OG: 'OG',
} as const;

export type UserBadgeType = (typeof UserBadgeType)[keyof typeof UserBadgeType];

export const isValidBadge = (type: string) => {
  return Object.values(UserBadgeType).includes(type as any);
};
