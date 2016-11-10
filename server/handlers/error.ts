const debug = require('debug')('checkpoints:errorHandler');
import { Request, Response, ErrorHandler } from 'express';

/**
 * Default error handler, todo extend to handle by Error type
 */
export default function error(error: Error, req: Request, res: Response, next: any) {
  if (!(error instanceof Error))
    error = new Error(error);
  res.status(500);
  res.json({
    error: error.message
  });
}