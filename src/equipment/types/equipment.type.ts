export const EQUIPMENT_TYPE = {
  HELMET: 'HELMET',
  CHEST: 'CHEST',
  LEGS: 'LEGS',
  SHOULDER: 'SHOULDER',
  CLOAK: 'CLOAK',
  RIGHT_HAND: 'RIGHT_HAND',
  LEFT_HAND: 'LEFT_HAND',
} as const;

export type EquipmentType = typeof EQUIPMENT_TYPE[keyof typeof EQUIPMENT_TYPE];
