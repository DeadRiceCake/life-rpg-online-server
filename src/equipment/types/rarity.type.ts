export const RARITY_TYPE = {
  COMMON: 'COMMON',
  UNCOMMON: 'UNCOMMON',
  RARE: 'RARE',
  EPIC: 'EPIC',
  LEGENDARY: 'LEGENDARY',
  MYTHIC: 'MYTHIC',
} as const;

export type RarityType = typeof RARITY_TYPE[keyof typeof RARITY_TYPE];
