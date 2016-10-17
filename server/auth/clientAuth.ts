const debug = require('debug')('checkpoints:clientAuth');

import * as passport from 'passport';
import Client from '../mongoose/Client';

const ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
const PublicClientStrategy = require('passport-oauth2-public-client').Strategy;

// todo use for clients with client_secret
export function useClientPasswordStrategy() {
  passport.use(new ClientPasswordStrategy((clientId, clientSecret, done) => {
    debug(clientId, clientSecret);
    Client.findById(clientId).then(client => {
      if (!client)
        return done(null, false);
      return done(null, client);
    }).catch(err => done(err));
  }));
}

export function authenticateClientPassword() {
  debug('auth client password');
  return passport.authenticate('oauth2-client-password', { session: false });

}

export function usePublicClientStrategy() {
  passport.use(new PublicClientStrategy((clientId, done) => {
    debug(clientId);
    Client.findById(clientId).then(client => {
      if (!client)
        return done(null, false);
      return done(null, client);
    }).catch(err => done(err));
  }));
}

export function authenticatePublicClient() {
  return passport.authenticate('oauth2-public-client', { session: false });
}