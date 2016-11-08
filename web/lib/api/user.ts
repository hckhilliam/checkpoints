import { get } from './fetch';
import { getUrl } from './utils';

export function getInfo(userId?: number): Promise<Checkpoints.User> {
  const url = getUrl('info', userId);
  return get(url).then(response => response.body as Checkpoints.User);
}
