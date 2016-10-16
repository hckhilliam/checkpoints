import { UPDATE_CHECKPOINTS, UpdateCheckpointsAction } from '../actions/checkpoints';

export default function reducer(state: Checkpoints.Checkpoint[] = [], action: Redux.Action) {
  switch (action.type) {
    case UPDATE_CHECKPOINTS:
      return (action as UpdateCheckpointsAction).checkpoints;
    default:
      return state;
  }
} 