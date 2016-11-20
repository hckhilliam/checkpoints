import './FriendBox.scss'

import * as React from 'react';
import * as classnames from 'classnames';

interface Props extends React.HTMLAttributes {
  friend: Checkpoints.Friend;
}

export default class FriendBox extends React.Component<Props, {}> {
  render() {
    const { className, friend } = this.props;
    const other = _.omit(this.props, 'className', 'friend');
    const cssClass = classnames('FriendBox', className);
    return (
      <div className={cssClass} {...other}>
        <img className="display" src={friend.picture.url} />
        <div className="name" title={friend.name}>{friend.name.split(' ')[0]}</div>
      </div>
    );
  }
}
