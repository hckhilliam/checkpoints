const debug = require('debug')('checkpoints:checkpoint');
import Checkpoint from '../mongoose/Checkpoint';

export function createCheckpoint(user_id: number, title: string, description: string, isPrivate: boolean = false) {
  debug(`Create checkpoint (${title}) (${description}) (${isPrivate})`);
  const checkpoint = new Checkpoint({
    user_id,
    title,
    description,
    isPrivate
  });
  return checkpoint.save();
}

export function getCheckpoints(user_id: number) {
  debug(`Getting all checkpoints for user (${user_id})`);
  return Checkpoint.find({user_id, isDeleted: false}, {
    _id: 1,
    user_id: 1,
    title: 1,
    description: 1,
    isPrivate: 1,
    isCompleted: 1
  });
}

export function getCheckpointById(_id: number) {
  debug(`Getting checkpoint (${_id})`);
  // NOTE: no security check on if checkpoint is deleted or not
  return Checkpoint.findById(_id);
}

export function updateCheckpoint(_id: number, query: CheckpointsServer.Checkpoint) {
  debug(`Updating checkpoint (${_id})`);
  delete query._id;
  return Checkpoint.findOneAndUpdate({_id}, query, {new: true});
}

export function deleteCheckpoint(_id: number) {
  debug(`Deleting checkpoint (${_id})`);
  return Checkpoint.findOneAndUpdate({_id}, {isDeleted: true}, {new: true});
}