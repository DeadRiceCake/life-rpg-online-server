export const JOB = {
  CITIZEN: 'CITIZEN',
  WARRIOR: 'WARRIOR',
  MAGE: 'MAGE',
  THEIF: 'THEIF',
} as const;

export type Job = typeof JOB[keyof typeof JOB];
