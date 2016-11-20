import './UserProfile.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import ProfileBanner from './ProfileBanner';
import CheckpointsList from './CheckpointsList';

import { getUserInfo } from '../actions/users';

interface Props {
  userId: number;
  user?: Checkpoints.User;
  onGetUserInfo?: () => void;
}

export class UserProfile extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.onGetUserInfo();
  }

  render() {
    const { user, userId } = this.props;
    return (
      <div className="UserProfile">
        {this.props.user && <ProfileBanner user={this.props.user} />}
        <div className="UserProfile-checkpoints">
          <h2 className="UserProfile-checkpoints-title">Checkpoints</h2>
          <CheckpointsList userId={userId} listStyle="Flat" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Checkpoints.State, ownProps: Props) => {
  const userId = ownProps.userId;
  return {
    user: state.users.users[userId]
  };
};

const mapDispatchToProps = (dispatch, ownProps: Props) => {
  const userId = ownProps.userId;
  return {
    onGetUserInfo: () => {
      dispatch(getUserInfo(userId));
    }
  };
};

const UserProfileContainer = connect(mapStateToProps, mapDispatchToProps)(UserProfile);
export default UserProfileContainer;