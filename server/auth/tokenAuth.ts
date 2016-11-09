const debug = require('debug')('checkpoints:tokenAuth');

import * as passport from 'passport';
import { Strategy } from 'passport-http-bearer';

import * as accesstoken from '../modules/accesstoken';

export function useBearerStrategy() {
  passport.use(new Strategy(
    (token, done) => {
      accesstoken.getUserFromToken(token)
        .then(user => done(null, user))
        .catch(err => done(err));
    }
  ));
}

export const authenticateToken = passport.authenticate('bearer', { session: false });