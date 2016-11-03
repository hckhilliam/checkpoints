const debug = require('debug')('checkpoints:api');

import { Router, Request, Response } from 'express';

import user from './user';
import checkpoint from './checkpoint';

import auth from './auth';
import me from './me';
import users from './users';

import error from '../handlers/error';

import { authenticate } from '../auth/auth';

const api = Router();

api.use('/auth', auth, error);
api.use('/user', user, error);

api.use('/auth', auth, error);
api.use('/me', authenticate, me, error);
api.use('/users', authenticate, users, error);

export default api;