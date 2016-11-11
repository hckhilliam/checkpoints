import {
  UPDATE_CHECKPOINTS,
  UPDATE_CHECKPOINT,
  REMOVE_CHECKPOINT,
  CheckpointsAction,
  CheckpointAction
} from '../actions/checkpoints';

export default function reducer(state: Checkpoints.Checkpoint[] = [], action: Redux.Action) {
  switch (action.type) {
    case UPDATE_CHECKPOINTS:
      return (action as CheckpointsAction).checkpoints;
    case UPDATE_CHECKPOINT:
      const checkpoint = (action as CheckpointAction).checkpoint;
      const index = _.findIndex(state, c => c.id == checkpoint.id);
      if (index < 0) {
        return state.concat(checkpoint);
      } else {
        state[index] = checkpoint;
        return [].concat(state);
      }
    case REMOVE_CHECKPOINT:
      const id = (action as CheckpointAction).checkpoint.id;
      return state.filter(c => c.id != id);
    default:
      return state;
  }
}
