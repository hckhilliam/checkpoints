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
                <Panel className="FriendsSection-list">
                    <h1>My Friends</h1>
                    <List>
                        {
                            friends.map(f => {
                                const pictureUrl = _.get(f, 'picture.url') as string;
                                const picture = pictureUrl ? <img src={pictureUrl} /> : null;
                                return (
                                    <ListItem key={f.id}>
                                        <div>{picture}</div>
                                        <div>{f.name}</div>
                                    </ListItem>
                                );
                            })
                        }
                    </List>
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