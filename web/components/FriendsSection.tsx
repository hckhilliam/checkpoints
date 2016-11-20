import './FriendsSection.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import Panel from './Panel';
import FriendBox from './FriendBox';
import UserProfile from './UserProfile';

import { getFriends } from '../actions/friends';
import { openDialog } from '../actions/dialog';

interface Props {
  friends?: Checkpoints.Friend[];
  onComponentDidMount?: () => void;
  onSelectFriend?: (friend: Checkpoints.Friend) => void;
}

interface State {

}

export class FriendsSection extends React.Component<Props, State> {
  static defaultProps: Props = {
    onComponentDidMount: () => {},
  };

  state: State = {

  };

  componentDidMount() {
    this.props.onComponentDidMount();
  }

  render() {
    const { friends, onSelectFriend } = this.props;

    return (
      <div className="FriendsSection">
        <Panel className="FriendsSection-heading">
          <h1>My Friends</h1>
        </Panel>
        <Panel className="FriendsSection-list">
          <div className="row">
            {
              friends.map(f => (
                <FriendBox
                  className="col-xs-3 col-sm-2 col-md-6 col-lg-3"
                  key={f.id}
                  friend={f}
                  onClick={() => onSelectFriend(f)}
                />
              ))
            }
          </div>
        </Panel>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    friends: state.friends
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onComponentDidMount: () => {
      dispatch(getFriends());
    },
    onSelectFriend: (friend: Checkpoints.Friend) => {
      dispatch(openDialog(<UserProfile userId={friend.id} />, {
        size: 'Large'
      }));
    }
  };
};

const FriendsSectionContainer = connect(mapStateToProps, mapDispatchToProps)(FriendsSection);
export default FriendsSectionContainer;
