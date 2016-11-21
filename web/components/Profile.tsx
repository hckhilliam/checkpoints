import './Profile.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import ProfileBanner from './ProfileBanner';
import { UserSettingsForm } from './UserSettings';
import { MaterialIcon } from './Icon';
import IconButton from './IconButton';
import UserProfile from './UserProfile';

import { openDialog } from '../actions/dialog';
import { respond } from '../actions/friends';

interface Props {
  user?: Checkpoints.User;
  notifications?: Checkpoints.Notifications;
}

interface FriendRequestsProps {
  friendRequests: Checkpoints.Friend[];
  onRespond?: (friendId: number, response: boolean) => void;
  onClick?: (friendId: number) => void;
}

const FriendRequests = (props: FriendRequestsProps) => {
  const { friendRequests, onRespond, onClick } = props;
  return (
    <div className="FriendRequests">
      {
        friendRequests.map(friend => {
          return (
            <div key={friend.id} className="FriendRequests-item">
              <div className="FriendRequests-label" onClick={() => onClick(friend.id)}>
                {_.get(friend, 'picture.url') && <img className="FriendRequests-picture" src={friend.picture.url} />}
                <span className="FriendRequests-name">{friend.name}</span>
              </div>
              <div className="FriendRequests-buttons">
                <IconButton className="FriendRequests-accept" onClick={() => onRespond(friend.id, true)}>
                  <MaterialIcon icon="check" />
                </IconButton>
                <IconButton className="FriendRequests-reject" onClick={() => onRespond(friend.id, false)}>
                  <MaterialIcon icon="close" />
                </IconButton>
              </div>
            </div>
          );
        })
      }
    </div>
  )
};

const FriendRequestsContainer = connect(
  state => { return {}; },
  (dispatch, ownProps: FriendRequestsProps) => {
    return {
      onRespond: (friendId: number, response: boolean) => {
        dispatch(respond(friendId, response));
      },
      onClick: (friendId: number) => {
        dispatch(openDialog(<UserProfile userId={friendId} />, {
          size: 'Large'
        }));
      }
    };
  }
)(FriendRequests);

export class Profile extends React.Component<Props, {}> {
  render() {
    const { user, notifications } = this.props;

    const { friendRequests } = notifications;

    return (
      <div className="Profile">
        <ProfileBanner user={this.props.user} friendStatus="Self" size="Small" />
        {!_.isEmpty(friendRequests) &&
          <div className="Profile-friend-requests">
            <h2 className="Profile-subtitle">Friend Requests</h2>
            <FriendRequestsContainer friendRequests={friendRequests} />
          </div>
        }
        <div className="Profile-settings">
          <h2 className="Profile-subtitle">Settings</h2>
          <UserSettingsForm />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Checkpoints.State) => {
  return {
    user: state.users.me,
    notifications: state.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default ProfileContainer;