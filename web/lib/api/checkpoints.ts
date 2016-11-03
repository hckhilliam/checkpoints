import { get, post, put } from './fetch';

function parseCheckpoint(data): Checkpoints.Checkpoint {
  data.id = data._id;
  delete data._id;
  return data as Checkpoints.Checkpoint;
}

function parseCheckpoints(data): Checkpoints.Checkpoint[] {
  return data.map(parseCheckpoint);
}

export function getCheckpoints(userId?: number): Promise<Checkpoints.Checkpoint[]> {
  const url = userId
    ? `/checkpoint/user/${userId}/checkpoints`
    : '/me/checkpoints';

  return get(url).then(res => parseCheckpoints(res.body));
}

export function insertCheckpoint(checkpoint: Checkpoints.Checkpoint): Promise<Checkpoints.Checkpoint> {
  const url = '/me/checkpoint';
  return post(url).then(res => parseCheckpoints(res.body));
}