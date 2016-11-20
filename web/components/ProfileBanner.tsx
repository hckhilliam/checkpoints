import './ProfileBanner.scss';

import * as React from 'react';

interface Props {
  user: Checkpoints.User;
}

export default class ProfileBanner extends React.Component<Props, {}> {
  render() {
    const { user } = this.props;
    return (
      <div className="ProfileBanner">
        <img className="ProfileBanner-image" src={user.picture.url} />
        <h1 className="ProfileBanner-name">{user.name}</h1>
      </div>
    );
  }
}