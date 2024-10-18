export const DAY = {
  SUNDAY: 'sun',
  MONDAY: 'mon',
  TUESDAY: 'tue',
  WEDNESDAY: 'wed',
  THURSDAY: 'thu',
  FRIDAY: 'fri',
  SATURDAY: 'sat',
} as const;

export type Day = typeof DAY[keyof typeof DAY];
