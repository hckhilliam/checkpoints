import * as express from 'express';
import * as passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import User from '../mongoose/User';

function upsertFacebookUser(profile, accessToken, done) {
  const user = {
    name: profile.displayName,
    email: profile.emails[0].value,
    facebookId: profile.id,
    accessToken
  };
  User.findOneAndUpdate(
    { email: user.email },
    user,
    { upsert: true },
    (err, user) => {
      done(err, user);
    }
  );
}

export function intializeAuth(app: express.Application) {
  app.use(passport.initialize());

  passport.use(new FacebookStrategy({
    clientID: process.env['FACEBOOK_APP_ID'],
    clientSecret: process.env['FACEBOOK_APP_SECRET'],
    callbackURL: 'http://localhost:8080/api/auth/facebook/callback',
    profileFields: ['id', 'email', 'displayName']
  },
  (accessToken, refreshToken, profile, done) => {
    upsertFacebookUser(profile, accessToken, done);
  }))
}

export function authenticateFacebook(options = {}) {
  return passport.authenticate(
    'facebook',
    Object.assign(
      {},
      {
        scope: ['public_profile', 'email'],
        session: false
      },
      options
    )
  );
}

export function authenticateFacebookCallback() {
  return authenticateFacebook({
    failureRedirect: '/login'
  });
}