export const DEFAULT_STATE = {
  me: [],
  users: {}
};

export function getSharedUpdateQuery(action: any, command: any): any {
  const { userId } = action;
  if (userId) {
    return {
      users: {
        [userId]: command
      }
    };
  } else {
    return {
      me: command
    };
  }
}
