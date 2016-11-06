import { get, post, put, del } from './fetch';
import { getUrl } from './utils';

function parseCheckpoint(data): Checkpoints.Checkpoint {
  data.id = data._id;
  delete data._id;
  return data as Checkpoints.Checkpoint;
}

function parseCheckpoints(data): Checkpoints.Checkpoint[] {
  return data.map(parseCheckpoint);
}

export function getCheckpoints(userId?: number): Promise<Checkpoints.Checkpoint[]> {
  const url = getUrl('checkpoints', userId);
  return get(url).then(res => parseCheckpoints(res.body));
}

export function getCheckpoint(checkpointId: number, userId?: number): Promise<Checkpoints.Checkpoint> {
  const url = getUrl(`checkpoints/${checkpointId}`, userId);
  return get(url).then(res => parseCheckpoint(res.body));
}

export function addCheckpoint(checkpoint: Checkpoints.Checkpoint): Promise<Checkpoints.Checkpoint> {
  const url = getUrl('checkpoints');
  return post(url, checkpoint).then(res => parseCheckpoint(res.body));
}

export function saveCheckpoint(checkpoint: Checkpoints.Checkpoint): Promise<Checkpoints.Checkpoint> {
  const url = getUrl(`checkpoints/${checkpoint.id}`);
  return put(url, checkpoint).then(res => parseCheckpoint(res.body));
}

export function deleteCheckpoint(checkpointId: number): Promise<void> {
  const url = getUrl(`checkpoints/${checkpointId}`);
  return del(url);
}