const debug = require('debug')('checkpoints:api');

import { Router, Request, Response } from 'express';

import user from './user';

import auth from './auth';
import me from './me';
import users from './users';

import { error } from '../handlers/error';
import event from './event';
import flight from './flight';

import { authenticate } from '../auth/auth';

function init(req: CheckpointsServer.Request, res, next) {
  req.customParams = {};
  next();
}

const api = Router();

api.use('/auth', auth);
api.use('/user', user);

api.all('*', init);
api.use('/users', users);

api.all('*', authenticate);
api.use('/me', me);
api.use('/events', event);
api.use('/flights', flight);

api.use(error);

export default api;