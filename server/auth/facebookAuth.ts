const debug = require('debug')('checkpoints:facebookAuth');

import * as passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
const CustomStrategy = require('passport-custom');

const FB = require('fb');

import * as user from '../modules/user';
import * as facebook from '../modules/facebook';
import * as accesstoken from '../modules/accesstoken';

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
    debug('fb profile', profile);

    const fbUser: CheckpointsServer.FacebookUser = {
      id: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName
    };

    facebook.exchangeFacebookToken(accessToken)
      .then(token => {
        // get or create user
        return user.getUserByEmail(fbUser.email)
          .then(u => {
            if (u) {
              // set facebook user
              debug('existing facebook user');
              return user.setFacebookUser(u._id, fbUser)
            } else {
              // new user
              debug('new facebook user');
              return user.createUser({
                name: fbUser.name,
                email: fbUser.email,
                accounts: {
                  facebook: fbUser
                }
              });
            }
          })
          .then(u => Promise.all([
            accesstoken.getToken(u._id, 'web'),
            facebook.saveFacebookToken(fbUser.id, token.token, token.expires),
            u
          ]))
          .then(values => {
            // update user picture
            const user = values[2];
            const overwrite = !(user.picture && user.picture.url);
            return facebook.updateFacebookPicture(fbUser.id, overwrite).then(() => values)
          })
          .then(values => {
            done(null, {
              user: values[2],
              accessToken: values[0].token,
              facebookToken: values[1].token
            });
          });
      })
      .catch(err => done(err));
  }));
}
