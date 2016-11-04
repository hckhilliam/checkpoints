const debug = require('debug')('checkpoints:user');
import User from '../mongoose/User';

export function createUser(name: string, email: string) {
  debug(`Create user (${name}) (${email})`);
  const user = new User({
    name,
    email
  });
  return user.save();
}

export function getUser(userId: number) {
  debug(`Finding user (${userId})`);
  return User.findById(userId)
    .then(user => {
      if (!user) {
        throw new Error(`User (${userId}) not found`);
      }
      return user;
    });
}