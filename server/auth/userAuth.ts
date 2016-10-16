import * as passport from 'passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';

import User from '../mongoose/User';

const saltRounds = 10;

function getUser(email) {
  return User.findOne({ email });
}

function hash(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
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

export function authenticateUser(email, password) {
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
    done(null, user.email);
  });

  passport.deserializeUser((email, done) => {
    getUser(email)
      .then(user => {
        user ? done(null, user) : done(null, false);
      })
      .catch(err => done(err, null));
  })
}