const debug = require('debug')('checkpoints:meRoute');

import { Router, Request, Response } from 'express';

import common from './common';
import friends from './friends';

const api = Router();

api.all('*', (req: Request & CheckpointsServer.Request, res: Response, next) => {
  req.customParams.user = req.user;
  next();
});

api.get('/info', (req: CheckpointsServer.Request, res: Response) => {
  const { _id, name } = req.customParams.user;
  res.json({
    id: _id,
    name
  });
});

api.use('/', common);
api.use('/', friends);

export default api;
