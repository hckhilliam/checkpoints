import { Action } from 'redux';
import * as user from '../lib/api/user';

export const UPDATE_USER = 'UPDATE_USER';

export interface UserAction extends Action {
  userId?: number;
  user: Checkpoints.User;
}

export function getUserInfo(userId?: number) {
  return dispatch => {
    return user.getInfo(userId).then(user => dispatch(updateUser(user, userId)));
  };
}

export function updateUser(user: Checkpoints.User, userId?: number): UserAction {
  return {
    type: UPDATE_USER,
    userId,
    user
  };
}
