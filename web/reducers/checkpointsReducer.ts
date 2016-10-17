import {
  UPDATE_CHECKPOINTS, UpdateCheckpointsAction,
  TOGGLE_ONE_CHECKPOINT, ToggleOneCheckpointAction,
  INSERT_CHECKPOINT, InsertCheckpointAction
} from '../actions/checkpoints';

export default function reducer(state: Checkpoints.Checkpoint[] = [], action: Redux.Action) {
  switch (action.type) {
    case UPDATE_CHECKPOINTS:
      return (action as UpdateCheckpointsAction).checkpoints;
    case TOGGLE_ONE_CHECKPOINT: {
      const updatedcheckpoint = (action as ToggleOneCheckpointAction).checkpoint;
      let newState = state.filter(element => element.id != updatedcheckpoint.id);
      newState.push(updatedcheckpoint);
      return newState;
    }
    case INSERT_CHECKPOINT: {
      let newState = [].concat(state);
      newState.push((action as InsertCheckpointAction).checkpoint);
      return newState;
    }
    default:
      return state;
  }
}
