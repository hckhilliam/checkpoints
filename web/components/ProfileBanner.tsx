import './ProfileBanner.scss';

import * as React from 'react';
import * as classnames from 'classnames';

import { MaterialIcon } from './Icon';

type FriendStatus = 'Friends' | 'Pending' | 'None' | 'Self';

interface Props {
  user: Checkpoints.User;
  friendStatus?: FriendStatus;
  onAddFriend?: () => void;
}

function getFriendNode(friendStatus: FriendStatus, onAddFriend: () => void): React.ReactNode {
  const friendClass = classnames('ProfileBanner-friend', `ProfileBanner-friend--${friendStatus}`);
  switch (friendStatus) {
    case 'Friends':
      return (
        <div className={friendClass}>
          <MaterialIcon icon="sentiment_very_satisfied" />
          <span>Friends</span>
        </div>
      );
    case 'Pending':
      return (
        <div className={friendClass}>
          <MaterialIcon icon="sentiment_neutral" />
          <span>Request sent!</span>
        </div>
      );
    case 'None':
      return (
        <a className={friendClass} href="javascript://" onClick={onAddFriend}>
          <MaterialIcon icon="add_circle_outline" />
          <span>Add friend</span>
        </a>
      );
    default:
      return null;
  }
}

export default class ProfileBanner extends React.Component<Props, {}> {
  render() {
    const { user, friendStatus, onAddFriend } = this.props;

    const friend = getFriendNode(friendStatus, onAddFriend);

    return (
      <div className="ProfileBanner">
        <img className="ProfileBanner-image" src={user.picture.url} />
        <div className="ProfileBanner-right">
          <h1 className="ProfileBanner-name">{user.name}</h1>
          {friend}
        </div>
      </div>
    );
  }
}