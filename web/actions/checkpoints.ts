import * as checkpoints from '../lib/api/checkpoints';

export const UPDATE_CHECKPOINTS = 'UPDATE_CHECKPOINTS';
export const TOGGLE_ONE_CHECKPOINT = 'TOGGLE_ONE_CHECKPOINT';
export const INSERT_CHECKPOINT = 'INSERT_CHECKPOINT';

export interface UpdateCheckpointsAction extends Redux.Action {
  checkpoints: Checkpoints.Checkpoint[];
}

export interface ToggleOneCheckpointAction extends Redux.Action {
  checkpoint: Checkpoints.Checkpoint;
}

export interface InsertCheckpointAction extends Redux.Action {
  checkpoint: Checkpoints.Checkpoint;
}

function parseCheckpoint(data): Checkpoints.Checkpoint {
  data.id = data._id;
  delete data._id;
  return data as Checkpoints.Checkpoint;
}

export function getCheckpoints() {
  return dispatch => {
    return checkpoints.getCheckpoints(7).then(checkpoints => {
      return dispatch(updateCheckpoints(checkpoints));
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
          dispatch(updateOneCheckpoint(parseCheckpoint(res)));
        });
      }
    });
  }
}

export function addCheckpoint(checkpoint) {
  return dispatch => {
    return fetch('/api/checkpoint/', {
      method: 'POST',
      body: JSON.stringify(checkpoint),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      return res.json();
    }).then(checkpoint => {
      checkpoint.id = checkpoint._id;
      delete checkpoint._id;
      dispatch(insertCheckpoint(checkpoint));
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

export function insertCheckpoint(checkpoint): InsertCheckpointAction {
  return {
      type: INSERT_CHECKPOINT,
      checkpoint
  };
}
