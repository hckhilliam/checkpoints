import * as update from 'immutability-helper';
import { Action } from 'redux';

import { DEFAULT_STATE, getSharedUpdateQuery } from '../lib/reduxUtils';
import { UPDATE_USER, UserAction } from '../actions/users';

export default function reducer(state: Checkpoints.UsersState = DEFAULT_STATE, action: Action) {
  switch (action.type) {
    case UPDATE_USER:
      const user = (action as UserAction).user;
      return update(state, getSharedUpdateQuery(action, {
        $set: user
      }));
    default:
      return state;
  }
}
