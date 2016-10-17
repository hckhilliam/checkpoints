const debug = require('debug')('checkpoints:auth');

import * as passport from 'passport';
import * as express from 'express';

import { useFacebookStrategy, authenticateFacebook } from './facebookAuth';
import { usePublicClientStrategy, authenticatePublicClient } from './clientAuth';
import { useBearerStrategy, authenticateToken } from './tokenAuth';
import oauth2 from './oauth2';

export function initializeAuth(app: express.Application) {
  app.use(passport.initialize());
  useBearerStrategy();
  useFacebookStrategy();
  usePublicClientStrategy();
}

function fbCallback(req, res) {
  const user = req.user;
  debug(user);
  const expires = new Date(Date.now() + 1000 * 3600);
  res.cookie('access_token', user.accessToken, { expires });
  res.cookie('fb_token', user.facebookToken, { expires });
  res.redirect('/');
}

export const facebookLogin = [authenticateFacebook(), oauth2.errorHandler()];
export const facebookCallback = [authenticateFacebook(), fbCallback, oauth2.errorHandler()];
export const login = [authenticatePublicClient(), oauth2.token(), oauth2.errorHandler()];

export const authenticate = authenticateToken;