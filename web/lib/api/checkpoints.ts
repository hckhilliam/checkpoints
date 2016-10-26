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
    ? `/api/checkpoint/user/${userId}/checkpoints`
    : '/api/me/checkpoints';

  return get(url).then(res => parseCheckpoints(res.body));
}
