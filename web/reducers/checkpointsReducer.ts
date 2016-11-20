import * as update from 'immutability-helper';

import {
  UPDATE_CHECKPOINTS,
  UPDATE_CHECKPOINT,
  REMOVE_CHECKPOINT,
  CheckpointsAction,
  CheckpointAction
} from '../actions/checkpoints';

const defaultState = {
  me: [],
  users: {}
};

export default function reducer(state: Checkpoints.CheckpointsState = defaultState, action: Redux.Action) {
  switch (action.type) {
    case UPDATE_CHECKPOINTS:
      const checkpoints = (action as CheckpointsAction).checkpoints;
      return update(state, {
        me: {
          $set: checkpoints
        }
      });
    case UPDATE_CHECKPOINT:
      const checkpoint = (action as CheckpointAction).checkpoint;
      return update(state, {
        me: {
          $apply: (state: Checkpoints.Checkpoint[]) => {
            const index = state.findIndex(c => c.id == checkpoint.id);
            if (index < 0) {
              return state.concat([checkpoint]);
            } else {
              state[index] = checkpoint;
              return [].concat(state);
            }
          }
        }
      });
    case REMOVE_CHECKPOINT:
      const id = (action as CheckpointAction).checkpoint.id;
      return update(state, {
        me: {
          $apply: (state: Checkpoints.Checkpoint[]) => {
            return state.filter(c => c.id != id)
          }
        }
      });
    default:
      return state;
  }
}
