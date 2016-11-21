import * as update from 'immutability-helper';

import { UPDATE_NOTIFICATIONS, NotificationsAction } from '../actions/notifications';

export default function reducer(state: Checkpoints.Notifications = {}, action: Redux.Action) {
  switch (action.type) {
    case UPDATE_NOTIFICATIONS:
      const { notifications } = action as NotificationsAction;
      return update(state, {
        $merge: notifications
      });
    default:
      return state;
  }
}
