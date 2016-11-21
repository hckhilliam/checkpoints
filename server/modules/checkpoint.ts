const debug = require('debug')('checkpoints:checkpoint');
import Checkpoint from '../mongoose/Checkpoint';
import { GENERIC_CHECKPOINT_DATA } from '../lib/data';

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

export function getCheckpoints(user_id: number, getPrivate = false) {
  debug(`Getting all checkpoints for user (${user_id})`);
  const query = { user_id, isDeleted: false } as any;
  if (!getPrivate)
    query.isPrivate = false;
  return Checkpoint.find(query, GENERIC_CHECKPOINT_DATA).sort({ completedOn: -1, createdOn: -1 });
}

export function getActiveCheckpoints(user_id: number) {
  debug(`Getting all active checkpoints for user (${user_id})`);
  return Checkpoint.find({ user_id, isDeleted: false, isCompleted: false }, GENERIC_CHECKPOINT_DATA).sort('-createdOn');
}

export function getCheckpointById(_id: number, getPrivate = false) {
  debug(`Getting checkpoint (${_id})`);
  // NOTE: no security check on if checkpoint is deleted or not
  const query = { _id } as any;
  if (!getPrivate)
    query.isPrivate = false;
  return Checkpoint.findOne(query);
}

export function updateCheckpoint(_id: number, user_id: number, query: CheckpointsServer.Checkpoint) {
  debug(`Updating checkpoint (${_id})`);
  delete query._id;
  return Checkpoint.findOneAndUpdate({ _id, user_id }, query, { new: true });
}

export function deleteCheckpoint(_id: number, user_id: number) {
  debug(`Deleting checkpoint (${_id})`);
  return Checkpoint.findOneAndUpdate({ _id, user_id }, { isDeleted: true}, { new: true });
}