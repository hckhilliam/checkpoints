const debug = require('debug')('checkpoints:facebookAuth');

import * as passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { createAccessToken } from './tokenAuth';
const CustomStrategy = require('passport-custom');

const FB = require('fb');

import User from '../mongoose/User';
import FacebookUser from '../mongoose/FacebookUser';
import FacebookToken from '../mongoose/FacebookToken';

function upsertFacebookUser(userId, profile) {
  const fbUser = {
    _id: profile.id,
    user_id: userId,
    email: profile.emails[0].value,
    name: profile.displayName
  };

  return new Promise((resolve, reject) => {
    FacebookUser.findOneAndUpdate(
      { _id: fbUser._id },
      fbUser,
      { upsert: true, new: true }
    ).then(facebookUser => {
      resolve(facebookUser);
    }).catch(err => reject(err));
  });
}

function upsertUser(profile) {
  const user = {
    name: profile.displayName,
    email: profile.emails[0].value
  };

  return new Promise((resolve, reject) => {
    User.findOne({ email: user.email })
      .then(res => {
        if (res) {
          debug('existing user', res);
          return upsertFacebookUser(res._id, profile)
            .then(facebookUser => {
              resolve({
                user: res,
                facebookUser
              });
            });
        } else {
          const newUser = new User(user);
          return newUser.save().then(user => {
            debug('new user', user);
            return upsertFacebookUser(user._id, profile).then(facebookUser => {
              resolve({
                user,
                facebookUser
              });
            });
          });
        }
      })
      .catch(err => reject(err));
  });
}

export function authenticateFacebook() {
  return passport.authenticate('facebook', {
    session: false,
    scope: process.env['FACEBOOK_SCOPE']
  });
}

export function useFacebookStrategy() {
  passport.use(new FacebookStrategy({
    clientID: process.env['FACEBOOK_APP_ID'],
    clientSecret: process.env['FACEBOOK_APP_SECRET'],
    callbackURL: process.env['FACEBOOK_CALLBACK'],
    profileFields: ['id', 'email', 'displayName']
  },
  (accessToken, refreshToken, profile, done) => {
    debug('fb accessToken', accessToken);
    debug('fb profile', profile);

    FB.api('oauth/access_token', {
      client_id: process.env['FACEBOOK_APP_ID'],
      client_secret: process.env['FACEBOOK_APP_SECRET'],
      grant_type: 'fb_exchange_token',
      fb_exchange_token: accessToken
    }, res => {
      if (!res || res.error) {
        debug('facebook error', !res ? 'error' : res.error);
        return done(new Error(JSON.stringify(!res ? 'error' : res.error.message)));
      }

      const { access_token, expires } = res;
      debug(res);

      upsertUser(profile).then(res => {
        const { user, facebookUser } = res as any;
        debug(user, facebookUser);
        return createAccessToken(user['_id'], 'facebook', 60 * 24 * 3600).then(token => {
          const facebookToken = new FacebookToken({
            facebook_token: access_token,
            access_token: token,
            user_id: user['_id'],
            facebook_id: facebookUser['_id'],
            expires: Date.now() + expires * 1000
          });
          return facebookToken.save().then(fbToken => {
            return done(null, {
              user,
              facebookUser,
              facebookToken: fbToken['facebook_token'],
              accessToken: fbToken['access_token']
            });
          });
        });
      }).catch(err => {
        debug('err', err);
        done(err)
      });
    });
  }));
}
