export const UPDATE_CHECKPOINTS = 'UPDATE_CHECKPOINTS';

export interface UpdateCheckpointsAction extends Redux.Action {
  checkpoints: Checkpoints.Checkpoint[];
}

export function getCheckpoints() {
  return dispatch => {
    return fetch('/api/checkpoint/getCheckpoints').then((res) => {
      return res.json();
    }).then(checkpoints => {
      dispatch(updateCheckpoints(checkpoints.map(c => {
        c.id = c._id;
        delete c._id;
        return c;
      })));
    });
  }
}

export function updateCheckpoints(checkpoints): UpdateCheckpointsAction {
  return {
    type: UPDATE_CHECKPOINTS,
    checkpoints
  };
}