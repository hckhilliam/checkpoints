import './FriendsSection.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import Panel from './Panel';
import { List, ListItem } from './List';

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
                const pictureUrl = _.get(f, 'picture.url') as string;
                const picture = pictureUrl ? <img className="display" src={pictureUrl} /> : null;
                return (
                  <div key={f.id} className="friend-box col-xs-3 col-sm-2 col-md-6 col-lg-3">
                    <div>{picture}</div>
                    <div className="name" title={f.name}>{f.name.split(' ')[0]}</div>
                  </div>
                );
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