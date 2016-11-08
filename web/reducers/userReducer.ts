import { UPDATE_USER_INFO, UserAction } from '../actions/user';

export default function reducer(state: Checkpoints.User = {}, action: Redux.Action) {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return (action as UserAction).user;
    default:
      return state;
  }
}