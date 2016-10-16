import * as express from 'express';
import * as passport from 'passport';

import { useFacebookStrategy } from './facebookAuth';
import { useLocalStrategy } from './userAuth';

export function initializeAuth(app: express.Application) {
  app.use(passport.initialize());
  useFacebookStrategy();
  useLocalStrategy();
}