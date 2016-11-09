const debug = require('debug')('checkpoints:authenticatorHandler');
import { Request, Response, ErrorHandler } from 'express';

export function isSelf(req: Request, res: Response, next: any) {
  if (req['user']['_id'] == res['customParams']['user']['_id']) {
    next();
  } else {
    // TODO: add more errors
    next(new Error('unauthorized'));
  }
}