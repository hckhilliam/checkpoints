const debug = require('debug')('checkpoints:checkpoint');
import Checkpoint from '../mongoose/Checkpoint';

export function createCheckpoint(title: string, description: string, isPrivate: boolean = false) {
  debug(`Create checkpoint (${title}) (${description}) (${isPrivate})`);
  const checkpoint = new Checkpoint({
    user_id: 7, // TODO: change this to actual user_id
    title,
    description,
    isPrivate,
  });
  return checkpoint.save();
}

export function getUserCheckpoints() {
  return Checkpoint.find({user_id: 7});   // TODO: change this to actual user_id
}