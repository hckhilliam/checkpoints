import { Action } from 'redux';
import * as user from '../lib/api/user';

export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const CLEAR_USER_INFO = 'CLEAR_USER_INFO';

export interface UserAction extends Action {
  user: Checkpoints.User
}

export function getInfo() {
  return (dispatch, getState) => {
    const state = getState();
    if (_.isEmpty(state.user))
      return user.getInfo().then(user => dispatch(updateInfo(user)));
  };
}

export function updateInfo(user: Checkpoints.User): UserAction {
  return {
    type: UPDATE_USER_INFO,
    user
  };
}

export function clearInfo(): Action {
  return {
    type: CLEAR_USER_INFO
  };
}