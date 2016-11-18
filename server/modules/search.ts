const debug = require('debug')('checkpoints:search');
import User from '../mongoose/User';
import { GENERIC_USER_DATA } from '../lib/data';

export function searchPeople(user_id: number, searchQuery: string): Promise<CheckpointsServer.User[]> {
  debug(`searching through people for ${user_id} with query ${searchQuery}`);
  return User.find({ insensitiveName: { $regex: '\\b' + searchQuery.toUpperCase() } }, GENERIC_USER_DATA)
    .sort('insensitiveName').then(users => users);
}