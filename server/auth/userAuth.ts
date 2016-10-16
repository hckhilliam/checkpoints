const debug = require('debug')('checkpoints:userAuth');

import * as passport from 'passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt-nodejs';

import User from '../mongoose/User';

const ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;

function getUser(email) {
  return User.findOne({ email });
}

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
    getUser(email)
      .then(user => {
        if (user && user['password'])
          return reject(`User with email ${email} already exists`);

        hash(password)
          .then(hashedPassword => {
            if (user) {
              user.update({
                password: hashedPassword
              }).then(u => resolve(u));
            } else {
              const newUser = new User({
                email,
                password: hashedPassword,
                name
              });
              newUser.save().then(u => resolve(u));
            }
          })
          .catch(err => {
            reject(err);
          });
        })
      .catch(err => reject(err));
  });
}

export function checkUser(email, password) {
  return new Promise((resolve, reject) => {
    getUser(email)
      .then(user => {
        bcrypt.compare(password, user['password'], (err, res) => {
          if (err)
            return reject(err);

          resolve(res ? user : null);
        });
      })
      .catch(err => reject(err));
  });
}

export function useLocalStrategy() {
  passport.use(new Strategy((username, password, done) => {
    debug('local');
    getUser(username)
      .then(user => {
        if (!user)
          return done(null, false);

        bcrypt.compare(password, user['password'], (err, res) => {
          if (err)
            return done(err);

          return res
            ? done(null, user)
            : done(null, false);
        });
      })
      .catch(err => done(err));
  }));

  passport.serializeUser((user, done) => {
    debug('serialize');
    debug(user);
    done(null, user.email);
  });

  passport.deserializeUser((email, done) => {
    debug('deserializeUser');
    getUser(email)
      .then(user => {
        user ? done(null, user) : done(null, false);
      })
      .catch(err => done(err, null));
  })
}

export function useClientPasswordStrategy() {
  passport.use(new ClientPasswordStrategy((username, password, done) => {
    debug('client password');
    getUser(username)
      .then(user => {
        if (!user)
          return done(null, false);

        bcrypt.compare(password, user['password'], (err, res) => {
          if (err)
            return done(err);

          return res
            ? done(null, user)
            : done(null, false);
        });
      })
      .catch(err => done(err));
  }));
}

export function authenticateUser() {
  debug('auth user local');
  return passport.authenticate('local', { session: false });
}