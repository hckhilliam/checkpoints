import { UPDATE_USER_INFO, UpdateUserAction } from '../actions/user';

export default function reducer(state: Checkpoints.User = {}, action: Redux.Action) {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return (action as UpdateUserAction).user;
    default:
      return state;
  }
}