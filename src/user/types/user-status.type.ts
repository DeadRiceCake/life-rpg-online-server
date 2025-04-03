export const UserStatus = {
  NORMAL: 'NORMAL',
  BANNED: 'BANNED',
  DELETED: 'DELETED',
} as const;
export type UserStatus = typeof UserStatus[keyof typeof UserStatus];
export const UserStatusList = Object.values(UserStatus);
