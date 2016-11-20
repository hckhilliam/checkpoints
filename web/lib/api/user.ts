import { get, put } from './fetch';
import { getUrl } from './utils';

export function getInfo(userId?: number): Promise<Checkpoints.User> {
  const url = getUrl('info', userId);
  return get(url).then(response => response.body as Checkpoints.User);
}

export function updateUser(user: Checkpoints.User): Promise<Checkpoints.User> {
  const url = getUrl('');
  return put(url, user); 
}
