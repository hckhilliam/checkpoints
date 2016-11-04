const debug = require('debug')('checkpoints:users');

import { Router, Request, Response } from 'express';

import { getUser } from '../modules/user';

const api = Router();

api.param('user_id', (req: Request & Checkpoints.Request, res: Response, next, userId) => {
  getUser(userId)
    .then(user => {
      req.customParams.user = user as any;
      next();
    })
    .catch(next);
});

api.get('/:user_id/info', (req: Request & Checkpoints.Request, res: Response, next) => {
  res.json(req.customParams.user);
});

export default api;
