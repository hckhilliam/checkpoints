const debug = require('debug')('checkpoints:errorHandler');
import { Request, Response, ErrorHandler } from 'express';

export class ForbiddenError extends Error {
  constructor() {
    super('Forbidden');
  }
}

/**
 * Default error handler, todo extend to handle by Error type
 */
export default function error(error: Error, req: Request, res: Response, next: any) {
  if (error instanceof ForbiddenError) {
    res.status(403);
  } else {
    res.status(500);
  }

  if (!(error instanceof Error)) {
    error = new Error(error);
  }

  res.json({
    error: error.message
  });
}