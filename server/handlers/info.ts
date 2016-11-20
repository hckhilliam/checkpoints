const debug = require('debug')('checkpoints:userHandler');

import { Request, Response } from 'express';

/**
 * Returns a user's id, name, and picture
 */
export function getUserInfo(req: CheckpointsServer.Request, res: Response) {
  const user = _.pick(req.customParams.user, '_id', 'name', 'picture', 'settings');
  res.json(user);
}
