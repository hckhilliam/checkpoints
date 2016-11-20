const debug = require('debug')('checkpoints:authenticatorHandler');
import { Request, Response, ErrorHandler } from 'express';

import { getUserId, getCallerUserId } from '../lib/request';
import { ForbiddenError } from './error';

export function isSelf(req: CheckpointsServer.Request, res: Response, next: any) {
  if (checkIsSelf(req)) {
    next();
  } else {
    next(new ForbiddenError());
  }
}

export function checkIsSelf(req: CheckpointsServer.Request) {
  return getUserId(req) == getCallerUserId(req);
}