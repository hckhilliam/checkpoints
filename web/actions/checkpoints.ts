import { Action } from 'redux';

import * as checkpoints from '../lib/api/checkpoints';

// Action types
export const UPDATE_CHECKPOINTS = 'UPDATE_CHECKPOINTS';
export const UPDATE_CHECKPOINT = 'UPDATE_CHECKPOINT';
export const REMOVE_CHECKPOINT = 'REMOVE_CHECKPOINT';

// Actions
export interface CheckpointAction extends Action {
  checkpoint: Checkpoints.Checkpoint;
}

export interface CheckpointsAction extends Action {
  checkpoints: Checkpoints.Checkpoint[];
}

// Action creators
function updateCheckpoint(checkpoint): CheckpointAction {
  return {
    type: UPDATE_CHECKPOINT,
    checkpoint
  };
}

function updateCheckpoints(checkpoints): CheckpointsAction {
  return {
    type: UPDATE_CHECKPOINTS,
    checkpoints
  };
}

function removeCheckpoint(checkpointId): CheckpointAction {
  return {
    type: REMOVE_CHECKPOINT,
    checkpoint: { id: checkpointId }
  };
}

export function getCheckpoints() {
  return dispatch => {
    return checkpoints.getCheckpoints()
      .then(checkpoints => dispatch(updateCheckpoints(checkpoints)));
  }
}

export function getCheckpoint(checkpointId: number) {
  return (dispatch, getState: () => Checkpoints.State) => {
    const state = getState();
    const index = state.checkpoints.findIndex(c => c.id == checkpointId);

    return checkpoints.getCheckpoint(checkpointId)
      .then(checkpoint => dispatch(updateCheckpoint(checkpoint)));
  };
}

export function addCheckpoint(checkpoint: Checkpoints.Checkpoint) {
  return dispatch => {
    return checkpoints.addCheckpoint(checkpoint)
      .then(checkpoint => dispatch(updateCheckpoint(checkpoint)));
  };
}

export function saveCheckpoint(checkpoint: Checkpoints.Checkpoint) {
  return dispatch => {
    return checkpoints.saveCheckpoint(checkpoint)
      .then(checkpoint => dispatch(updateCheckpoint(checkpoint)));
  };
}

export function deleteCheckpoint(checkpointId: number) {
  return dispatch => {
    return checkpoints.deleteCheckpoint(checkpointId)
      .then(() => dispatch(removeCheckpoint(checkpointId)));
  };
}

export function completeCheckpoint(checkpointId: number, completed = true) {
  return (dispatch, getState: () => Checkpoints.State) => {
    const state = getState();
    const checkpoint = state.checkpoints.find(c => c.id == checkpointId);
    if (checkpoint && checkpoint.isCompleted != completed) {
      const update = Object.assign({}, checkpoint, {
        isCompleted: completed
      });
      return dispatch(saveCheckpoint(update));
    }
  };
}

export function addCheckpointImages(checkpointId: number, images: Checkpoints.Picture[]) {
  return (dispatch, getState: () => Checkpoints.State) => {
    const state = getState();
    const checkpoint = state.checkpoints.find(c => c.id == checkpointId);
    if (checkpoint) {
      const update = Object.assign({}, checkpoint, {
        pictures: checkpoint.pictures.concat(images)
      });
      return dispatch(saveCheckpoint(update));
    }
  };
}