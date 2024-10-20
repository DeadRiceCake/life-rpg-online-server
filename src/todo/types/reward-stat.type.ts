export const REWARD_STAT = {
  STRENGTH: 'strength',
  INTELLIGENCE: 'intelligence',
  DEXTERITY: 'dexterity',
} as const;

export type RewardStat = typeof REWARD_STAT[keyof typeof REWARD_STAT];
