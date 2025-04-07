export const UserJoinType = {
  LOCAL: 'LOCAL',
  GOOGLE: 'GOOGLE',
} as const;
export type UserJoinType = typeof UserJoinType[keyof typeof UserJoinType];
export const UserJoinTypeList = Object.values(UserJoinType);
