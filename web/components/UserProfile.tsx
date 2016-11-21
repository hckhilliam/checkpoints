import './UserProfile.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import ProfileBanner from './ProfileBanner';
import CheckpointsList from './CheckpointsList';

import { getUserInfo } from '../actions/users';
import { addFriend } from '../lib/api/friends';

interface Props {
  userId: number;
  user?: Checkpoints.User;
  friends?: Checkpoints.Friend[];
  onGetUserInfo?: () => void;
}

interface State {
  friendRequestSent?: boolean;
}

export class UserProfile extends React.Component<Props, State> {
  state: State = {
    friendRequestSent: false
  };

  componentDidMount() {
    this.props.onGetUserInfo();
  }

  handleAddFriend = () => {
    addFriend(this.props.userId).then(() => {
      this.setState({ friendRequestSent: true });
    });
  };

  render() {
    const { user, userId, friends } = this.props;

    let friendStatus = this.state.friendRequestSent ? 'Pending' : 'None';
    if (!userId)
      friendStatus = 'Self';
    else if (friends.find(f => f.id == userId))
      friendStatus = 'Friends';

    return (
      <div className="UserProfile">
        {this.props.user && <ProfileBanner user={this.props.user} friendStatus={friendStatus as any} onAddFriend={this.handleAddFriend} />}
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
    user: state.users.users[userId],
    friends: state.friends
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