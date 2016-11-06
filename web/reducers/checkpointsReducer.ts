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
      return state.filter(c => c.id != checkpoint.id).concat([checkpoint]);
    case REMOVE_CHECKPOINT:
      const id = (action as CheckpointAction).checkpoint.id;
      return state.filter(c => c.id != id);
    default:
      return state;
  }
}
