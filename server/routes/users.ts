const debug = require('debug')('checkpoints:users');

import { Router, Request, Response } from 'express';

import { getUser } from '../modules/user';

const api = Router();

api.param('user_id', (req: Request, res: Response, next, userId) => {
  getUser(userId)
    .then(user => {
      req['userParam'] = user;
      next();
    })
    .catch(next);
});

api.get('/:user_id/info', (req: Request, res: Response, next) => {
  const { _id, name } = req['userParam'];
  res.json({
    id: _id,
    name
  });
});

export default api;
