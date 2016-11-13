import { get, post, put, del } from './fetch';
import { getUrl } from './utils';

function parseFriend(friend): Checkpoints.Friend {
  friend.id = friend._id;
  delete friend._id;
  return friend as Checkpoints.Friend;
}

function parseFriends(data): Checkpoints.Friend[] {
  return data.map(f => {
    f = parseFriend(f);
    return f;
  });
}

export function getFriends(): Promise<Checkpoints.Friend[]> {
  const url = getUrl('friends');
  return get(url).then(res => parseFriends(res.body));
}