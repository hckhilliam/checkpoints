const debug = require('debug')('checkpoints:api');

import { Router, Request, Response } from 'express';

import user from './user';
import checkpoint from './checkpoint';

import auth from './auth';
import me from './me';
import users from './users';

import error from '../handlers/error';

import { authenticate } from '../auth/auth';

// Default success handler
function defaultHandler(req, res: Response, next) {
  res.sendStatus(200);
}

const api = Router();

api.use('/auth', auth);
api.use('/user', user);

api.all('*', authenticate);
api.use('/me', me);
api.use('/users', users);

api.use(defaultHandler, error);

export default api;