const debug = require('debug')('checkpoints:errorHandler');
import { Request, Response, ErrorHandler } from 'express';

/**
 * Default error handler, todo extend to handle by Error type
 */
export default function error(error, req: Request, res: Response, next: any) {
  res.status(500);
  res.json({
    error
  });
}