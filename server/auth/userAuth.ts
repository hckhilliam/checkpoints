const debug = require('debug')('checkpoints:userAuth');

import * as passport from 'passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt-nodejs';

import * as user from '../modules/user';

function hash(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, null, null, (err, hash) => {
      if (err)
        return reject(err);
      return resolve(hash);
    });
  });
}

export function createUser(email, password, name) {
  return new Promise((resolve, reject) => {
    user.getUserByEmail(email)
      .then(u => {
        if (u)
          return reject(`Email already exists`);

        hash(password).then(hashedPassword => {
          user.createUser({
            name,
            email,
            password: hashedPassword as string
          }).then(resolve);
        })
        .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
}

export function checkUser(email, password) {
  return new Promise((resolve, reject) => {
    if (!password)
      return reject('Invalid credentials');
    user.getUserByEmail(email)
      .then(user => {
        if (!user)
          return reject('Invalid credentials');
        bcrypt.compare(password, user['password'], (err, res) => {
          if (err)
            return reject('Invalid credentials');

          resolve(res ? user : null);
        });
      })
      .catch(err => reject(err));
  });
}

export function authenticateUser() {
  debug('auth user local');
  return passport.authenticate('local', { session: false });
}