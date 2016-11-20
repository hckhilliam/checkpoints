import './FriendBox.scss'

import * as React from 'react';
import * as classnames from 'classnames';

interface Props extends React.HTMLAttributes {
  friend: Checkpoints.Friend;
}

export default class FriendBox extends React.Component<Props, {}> {
  render() {
    const { className, friend } = this.props;

    const cssClass = classnames('friend-box', className, 'col-xs-3', 'col-sm-2', 'col-md-6', 'col-lg-3');

    return (
      <div className={cssClass}>
        <img className="display" src={friend.picture.url} />
        <div className="name" title={friend.name}>{friend.name.split(' ')[0]}</div>
      </div>
    );
  }
}
