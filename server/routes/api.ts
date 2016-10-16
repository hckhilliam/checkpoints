import { Router, Request, Response } from 'express';

import auth from './auth';
import user from './user';
import checkpoint from './checkpoint';

const debug = require('debug')('checkpoints:api');

const api = Router();

api.get('/hello', (req: Request, res: Response, next) => {
  debug('hello!');
  res.send(':)');
});

api.use('/auth', auth);
api.use('/user', user);
api.use('/checkpoint', checkpoint);

export default api;