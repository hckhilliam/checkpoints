import './UserProfile.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import ProfileBanner from './ProfileBanner';
import CheckpointsList from './CheckpointsList';

import { getUserInfo } from '../actions/users';
import { respond } from '../actions/friends';

import { addFriend } from '../lib/api/friends';

interface Props {
  userId: number;
  user?: Checkpoints.User;
  checkpoints?: Checkpoints.Checkpoint[];
  friends?: Checkpoints.Friend[];
  friendRequests?: Checkpoints.Friend[];
  isSelf?: boolean;
  onGetUserInfo?: () => void;
  onAcceptFriend?: () => void;
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

  handleAcceptFriend = () => {
    this.props.onAcceptFriend();
  }

  render() {
    const { user, userId, friends, friendRequests, checkpoints, isSelf } = this.props;

    let friendStatus = this.state.friendRequestSent ? 'Pending' : 'None';
    if (!userId || isSelf)
      friendStatus = 'Self';
    else if (friends.find(f => f.id == userId))
      friendStatus = 'Friends';
    else if (friendRequests.find(f => f.id == userId))
      friendStatus = 'Accept';

    return (
      <div className="UserProfile">
        {this.props.user && <ProfileBanner user={this.props.user} friendStatus={friendStatus as any} onAddFriend={this.handleAddFriend} onAcceptFriend={this.handleAcceptFriend} />}
        {(!_.isArray(checkpoints) || !_.isEmpty(checkpoints)) &&
          <div className="UserProfile-checkpoints">
            <h2 className="UserProfile-checkpoints-title">Checkpoints</h2>
            <CheckpointsList userId={userId} listStyle="Flat" />
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state: Checkpoints.State, ownProps: Props) => {
  const userId = ownProps.userId;
  return {
    user: state.users.users[userId],
    checkpoints: state.checkpoints.users[userId],
    friends: state.friends,
    friendRequests: state.notifications.friendRequests,
    isSelf: userId == state.users.me.id
  };
};

const mapDispatchToProps = (dispatch, ownProps: Props) => {
  const userId = ownProps.userId;
  return {
    onGetUserInfo: () => {
      dispatch(getUserInfo(userId));
    },
    onAcceptFriend: () => {
      dispatch(respond(userId, true));
    }
  };
};

const UserProfileContainer = connect(mapStateToProps, mapDispatchToProps)(UserProfile);
export default UserProfileContainer;