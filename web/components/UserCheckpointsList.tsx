import { connect } from 'react-redux';

import { CheckpointsList } from './CheckpointsList';

import { getCheckpoints, getCheckpoint } from '../actions/checkpoints';

const mapStateToProps = state => {
  return {
    checkpoints: state.checkpoints
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onComponentDidMount: () => {
      dispatch(getCheckpoints());
    },
    onSelectCheckpoint: (checkpoint: Checkpoints.Checkpoint) => {
      dispatch(getCheckpoint(checkpoint.id));
    }
  };
};

const UserCheckpointsListContainer = connect(mapStateToProps, mapDispatchToProps)(CheckpointsList);
export default UserCheckpointsListContainer;
