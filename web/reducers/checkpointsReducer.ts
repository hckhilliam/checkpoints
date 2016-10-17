import { 
  UPDATE_CHECKPOINTS, UpdateCheckpointsAction, 
  TOGGLE_ONE_CHECKPOINT, ToggleOneCheckpointAction 
} from '../actions/checkpoints';

export default function reducer(state: Checkpoints.Checkpoint[] = [], action: Redux.Action) {
  switch (action.type) {
    case UPDATE_CHECKPOINTS:
      return (action as UpdateCheckpointsAction).checkpoints;
    case TOGGLE_ONE_CHECKPOINT:
      const updatedcheckpoint = (action as ToggleOneCheckpointAction).checkpoint;
      let newState = state.filter(element => element.id != updatedcheckpoint.id);
      newState.push(updatedcheckpoint);
      return newState;
    default:
      return state;
  }
} 