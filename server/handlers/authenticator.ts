const debug = require('debug')('checkpoints:authenticatorHandler');
import { Request, Response, ErrorHandler } from 'express';

export function isSelf(req: CheckpointsServer.Request, res: Response, next: any) {
  if (req.user._id == req.customParams.user._id) {
    next();
  } else {
    // TODO: add more errors
    next(new Error('unauthorized'));
  }
}