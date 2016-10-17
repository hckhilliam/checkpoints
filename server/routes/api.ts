const debug = require('debug')('checkpoints:api');

import { Router, Request, Response } from 'express';

import auth from './auth';
import user from './user';
import checkpoint from './checkpoint';
import me from './me';

import { authenticate } from '../auth/auth';

const api = Router();

api.get('/hello', (req: Request, res: Response, next) => {
  debug('hello!');
  res.send(':)');
});

api.use('/auth', auth);
api.use('/user', user);
api.use('/checkpoint', checkpoint);
api.use('/me', authenticate, me);

export default api;