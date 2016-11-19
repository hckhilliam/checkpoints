const debug = require('debug')('checkpoints:userModule');
import User from '../mongoose/User';

function parseUser(user: any): CheckpointsServer.User {
  return user;
}

function parseUsers(users: any): CheckpointsServer.User[] {
  return users;
}

export function createUser(user: CheckpointsServer.User): Promise<CheckpointsServer.User> {
  debug(`Create user (${user.name}) (${user.email})`);
  return User.create(user);
}

export function getUser(userId: number): Promise<CheckpointsServer.User> {
  debug(`Finding user (${userId})`);
  return User.findById(userId).then(parseUser);
}

export function getAllUsers(): Promise<CheckpointsServer.User[]> {
  debug('Finding all users');
  return User.find().then(parseUsers);
}

export function getUserByEmail(email: string): Promise<CheckpointsServer.User> {
  debug(`Finding user by email (${email})`);
  return getUserByQuery({ email });
}

export function getUserByQuery(query: any): Promise<CheckpointsServer.User> {
  debug(`Finding user by query (${JSON.stringify(query)})`);
  return User.findOne(query).then(parseUser);
}

export function updateUser(user: CheckpointsServer.User): Promise<CheckpointsServer.User> {
  return User.findByIdAndUpdate(user._id, user).then(parseUser);
}

export function getUserByFacebookId(facebookId: string): Promise<CheckpointsServer.User> {
  return getUserByQuery({ 'accounts.facebook.id': facebookId });
}

export function setFacebookUser(userId: number, user: CheckpointsServer.FacebookUser): Promise<CheckpointsServer.User> {
  debug('setting facebook user', user);
  return User.findByIdAndUpdate(userId, {
    $set: {
      'accounts.facebook': user
    }
  }).then(parseUser);
}

export function updatePicture(userId: number, picture: CheckpointsServer.Picture) {
  return User.findByIdAndUpdate(userId, {
    $set: {
      picture
    }
  }).then(parseUser);
}