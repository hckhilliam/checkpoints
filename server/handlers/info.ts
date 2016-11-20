const debug = require('debug')('checkpoints:userHandler');

import { Request, Response } from 'express';

export function getUserInfo(req: CheckpointsServer.Request, res: Response) {
  const user = _.pick(req.customParams.user, '_id', 'name', 'picture');
  res.json(user);
}
