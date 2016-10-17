import * as querystring from 'querystring';

export const UPDATE_CHECKPOINTS = 'UPDATE_CHECKPOINTS';
export const TOGGLE_ONE_CHECKPOINT = 'TOGGLE_ONE_CHECKPOINT';

export interface UpdateCheckpointsAction extends Redux.Action {
  checkpoints: Checkpoints.Checkpoint[];
}

export interface ToggleOneCheckpointAction extends Redux.Action {
  checkpoint: Checkpoints.Checkpoint;
}

export function getCheckpoints() {
  return dispatch => {
    return fetch('/api/checkpoint/user/7/checkpoints').then((res) => {
      return res.json();
    }).then(checkpoints => {
      dispatch(updateCheckpoints(checkpoints.map(mapResponseCheckpoint)));
    });
  }
}

export function toggleOneCheckpoint(checkpoint: Checkpoints.Checkpoint) {
  return dispatch => {
    return fetch(
      `/api/checkpoint/${checkpoint.id}`,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({isCompleted : !checkpoint.isCompleted})
      }
    ).then(res => {
      if (res.ok) {
        res.json().then((res) => {
          dispatch(updateOneCheckpoint(mapResponseCheckpoint(res)));
        });
      } else {
        //TODO: display error message
        dispatch({});
      }
    });
  }
}

export function updateCheckpoints(checkpoints): UpdateCheckpointsAction {
  return {
    type: UPDATE_CHECKPOINTS,
    checkpoints
  };
}

export function updateOneCheckpoint(checkpoint): ToggleOneCheckpointAction {
  return {
    type: TOGGLE_ONE_CHECKPOINT,
    checkpoint
  };
}

function mapResponseCheckpoint (checkpoint) {
  checkpoint.id = checkpoint._id;
  delete checkpoint._id;
  return checkpoint;
}