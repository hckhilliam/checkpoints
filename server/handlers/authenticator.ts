const debug = require('debug')('checkpoints:authenticatorHandler');
import { Request, Response, ErrorHandler } from 'express';

import { getUserId, getCallerUserId } from '../lib/request';
import ErrorFactory from './error';

export function isSelf(req: CheckpointsServer.Request, res: Response, next: any) {
  if (checkIsSelf(req)) {
    next();
  } else {
    next(ErrorFactory.forbidden());
  }
}

export function checkIsSelf(req: CheckpointsServer.Request) {
  return getUserId(req) == getCallerUserId(req);
}