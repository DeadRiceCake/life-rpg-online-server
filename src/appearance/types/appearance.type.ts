export const APPEARANCE_TYPE = {
  SKIN: 'SKIN',
  EYE: 'EYE',
  HAIR: 'HAIR',
  BEARD: 'BEARD',
} as const;

export type AppearanceType = typeof APPEARANCE_TYPE[keyof typeof APPEARANCE_TYPE];
