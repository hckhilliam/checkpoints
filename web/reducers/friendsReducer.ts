import {
  UPDATE_FRIENDS,
  UPDATE_FRIEND,
  REMOVE_FRIEND,
  FriendsAction,
  FriendAction
} from '../actions/friends'

export default function reducer(state: Checkpoints.Friend[] = [], action: Redux.Action) {
  switch (action.type) {
    case UPDATE_FRIENDS:
      return _.uniqBy((action as FriendsAction).friends, f => f.id);
    case UPDATE_FRIEND:
      const friend = (action as FriendAction).friend;
      return state.concat(friend);
    case REMOVE_FRIEND:
      const id = (action as FriendAction).friend.id;
      return state.filter(f => f.id != id);
    default:
      return state;
  }
}