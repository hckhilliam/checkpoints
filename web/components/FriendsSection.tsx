import './FriendsSection.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import Panel from './Panel';
import FriendBox from './FriendBox';

import { getFriends } from '../actions/friends';

interface Props {
  friends?: Checkpoints.Friend[];
  onComponentDidMount?: () => void;
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
    const { friends } = this.props;

    return (
      <div className="FriendsSection">
        <Panel className="FriendsSection-heading">
          <h1>My Friends</h1>
        </Panel>
        <Panel className="FriendsSection-list">
          <div className="row">
            {
              friends.map(f => {
                return (<FriendBox key={f.id} friend={f} />);
              })
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
    }
  };
};

const FriendsSectionContainer = connect(mapStateToProps, mapDispatchToProps)(FriendsSection);
export default FriendsSectionContainer;
