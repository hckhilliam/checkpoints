const debug = require('debug')('checkpoints:userModule');
import User from '../mongoose/User';

function parseUser(user: any): CheckpointsServer.User {
  return user;
}

export function createUser(user: CheckpointsServer.User): Promise<CheckpointsServer.User> {
  debug(`Create user (${user.name}) (${user.email})`);
  return User.create(user);
}

export function getUser(userId: number): Promise<CheckpointsServer.User> {
  debug(`Finding user (${userId})`);
  return User.findById(userId).then(parseUser);
}

export function getUserByEmail(email: string): Promise<CheckpointsServer.User> {
  debug(`Finding user by email (${email})`);
  return User.findOne({ email }).then(parseUser);
}
