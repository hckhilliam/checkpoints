import { Action } from 'redux';
import * as friends from '../lib/api/friends';

export const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';

export interface NotificationsAction extends Action {
  notifications: Checkpoints.Notifications
}

export function getNotifications() {
  return dispatch => {
    friends.getFriendRequests()
      .then(friendRequests => dispatch(updateNotifications({ friendRequests })));
  };
}

export function updateNotifications(notifications: Checkpoints.Notifications): NotificationsAction {
  return {
    type: UPDATE_NOTIFICATIONS,
    notifications
  };
}
