import './ProfileBanner.scss';

import * as React from 'react';
import * as classnames from 'classnames';

import { MaterialIcon } from './Icon';

type FriendStatus = 'Friends' | 'Pending' | 'None' | 'Self' | 'Accept';

interface Props {
  user: Checkpoints.User;
  friendStatus?: FriendStatus;
  size?: 'Small' | 'Normal';
  onAddFriend?: () => void;
  onAcceptFriend?: () => void;
}

function getFriendNode(friendStatus: FriendStatus, onAddFriend: () => void, onAcceptFriend: () => void): React.ReactNode {
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
    case 'Accept':
      return (
        <a className={friendClass} href="javascript://" onClick={onAcceptFriend}>
          <MaterialIcon icon="check_circle" />
          <span>Accept friend request</span>
        </a>
      );
    default:
      return null;
  }
}

export default class ProfileBanner extends React.Component<Props, {}> {
  static defaultProps: Props = {
    user: {},
    size: 'Normal'
  };

  render() {
    const { user, friendStatus, onAddFriend, onAcceptFriend, size } = this.props;
    const friend = !_.isUndefined(friendStatus) && getFriendNode(friendStatus, onAddFriend, onAcceptFriend);
    const cssClass = classnames('ProfileBanner', `ProfileBanner--${size}`);

    return (
      <div className={cssClass}>
        <img className="ProfileBanner-image" src={user.picture.url} />
        <div className="ProfileBanner-right">
          <h1 className="ProfileBanner-name">{user.name}</h1>
          {friend}
        </div>
      </div>
    );
  }
}