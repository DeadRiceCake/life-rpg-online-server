export const REWARD_STAT = {
  STRENGTH: 'str',
  INTELLIGENCE: 'int',
  DEXTERITY: 'dex',
} as const;

export type RewardStat = typeof REWARD_STAT[keyof typeof REWARD_STAT];
