const debug = require('debug')('checkpoints:userHandler');

import { Request, Response } from 'express';

import { checkIsSelf } from './authenticator';

const PUBLIC_FIELDS = ['_id', 'name', 'picture'];
const PRIVATE_FIELDS = ['settings', 'location'];

/**
 * Returns a user's id, name, and picture
 */
export function getUserInfo(req: CheckpointsServer.Request, res: Response) {
  const user = _.pick(req.customParams.user, PUBLIC_FIELDS.concat(checkIsSelf(req) ? PRIVATE_FIELDS : []));
  res.json(user);
}
