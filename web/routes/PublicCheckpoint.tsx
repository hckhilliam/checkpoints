import './PublicCheckpoint.scss';

import * as React from 'react';
import * as ReactRouter from 'react-router';
import { connect } from 'react-redux';

import Panel from '../components/Panel';
import ProfileBanner from '../components/ProfileBanner';
import { Checkpoint } from '../components/Checkpoint';

import { getUserInfo } from '../actions/users';
import { getCheckpoint } from '../actions/checkpoints';

interface Props extends ReactRouter.IInjectedProps {
  user?: Checkpoints.User;
  checkpoint?: Checkpoints.Checkpoint;
  onGetData?: () => void;
}

export class PublicCheckpoint extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.onGetData();
  }

  render() {
    const { user, checkpoint } = this.props;

    return (
      <div className="PublicCheckpoint">
        {(user || checkpoint) &&
          <Panel>
            <div className="PublicCheckpoint-content">
              {user && <ProfileBanner user={user} size="Small" />}
              {checkpoint && <Checkpoint checkpoint={checkpoint} privateView={false} />}
            </div>
          </Panel>
        }
      </div>
    );
  }
};

const mapStateToProps = (state: Checkpoints.State, ownProps: Props) => {
  const { params } = ownProps;
  const { userId, checkpointId } = params;

  const checkpoints = _.get(state.checkpoints.users, userId, []);

  return {
    user: state.users.users[userId],
    checkpoint: checkpoints.find(c => c.id == checkpointId)
  };
};

const mapDispatchToProps = (dispatch, ownProps: Props) => {
  const { params } = ownProps;
  const { userId, checkpointId } = params;
  return {
    onGetData: () => {
      dispatch(getUserInfo(userId));
      dispatch(getCheckpoint(checkpointId, userId));
    }
  }
};

const PublicCheckpointContainer = connect(mapStateToProps, mapDispatchToProps)(PublicCheckpoint);
export default PublicCheckpointContainer;
