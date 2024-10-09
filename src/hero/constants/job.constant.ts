export const JOB = {
  CITIZEN: 'citizen',
  WARRIOR: 'warrior',
  MAGE: 'mage',
  THEIF: 'theif',
} as const;

export type Job = typeof JOB[keyof typeof JOB];
