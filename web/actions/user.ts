import * as Redux from 'redux';

import { getUserInfo } from '../lib/api/user';

export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const CLEAR_USER_INFO = 'CLEAR_USER_INFO';

export interface UpdateUserAction extends Redux.Action {
  user: Checkpoints.User
}

export function getInfo() {
  return dispatch => {
    return getUserInfo().then(user => dispatch(updateInfo(user)));
  };
}

export function updateInfo(user: Checkpoints.User): UpdateUserAction {
  return {
    type: UPDATE_USER_INFO,
    user
  };
}

export function clearInfo(): Redux.Action {
  return {
    type: CLEAR_USER_INFO
  };
}