import { get, put } from './fetch';
import { getUrl } from './utils';

export function parseUser(body: any) {
  return {
    id: body._id,
    name: body.name,
    picture: body.picture
  } as Checkpoints.User;
}

export function getInfo(userId?: number): Promise<Checkpoints.User> {
  const url = getUrl('info', userId);
  return get(url).then(response => parseUser(response.body));
}

export function updateUser(user: Checkpoints.User): Promise<Checkpoints.User> {
  const url = getUrl('');
  return put(url, user); 
}
