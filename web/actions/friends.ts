import { Action } from 'redux';

import * as friends from '../lib/api/friends';

// Action types
export const UPDATE_FRIENDS = 'UPDATE_FRIENDS';
export const UPDATE_FRIEND = 'UPDATE_FRIEND';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';

// Actions
export interface FriendsAction extends Action {
  friends: Checkpoints.Friend[];
}

export interface FriendAction extends Action {
  friend: Checkpoints.Friend;
}

// Action creators
function updateFriend(friend): FriendAction {
  return {
    type: UPDATE_FRIEND,
    friend
  };
}

function updateFriends(friends): FriendsAction {
  return {
    type: UPDATE_FRIENDS,
    friends
  };
}

function removeFriend(friend): FriendAction {
  return {
    type: REMOVE_FRIEND,
    friend
  };
}

export function getFriends() {
  return dispatch => {
    return friends.getFriends()
      .then(friends => dispatch(updateFriends(friends)));
  };
}