const debug = require('debug')('checkpoints:usersRoute');

import { Router, Request, Response } from 'express';

import common from './common';
import { getUser } from '../modules/user';

const api = Router();

api.param('user_id', (req: CheckpointsServer.Request, res: Response, next, userId) => {
  getUser(userId)
    .then(user => {
      req.customParams.user = user;
      next();
    })
    .catch(next);
});

api.use('/:user_id', common);

export default api;
