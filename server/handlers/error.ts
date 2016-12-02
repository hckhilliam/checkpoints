const debug = require('debug')('checkpoints:errorHandler');
import { Request, Response, ErrorHandler } from 'express';

// 400
export class BadRequestError extends Error {
  constructor(message = 'Bad Request') {
    super(message);
  }
}

// 401
export class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
  }
}

// 403
export class ForbiddenError extends Error {
  constructor(message = 'Forbidden') {
    super(message);
  }
}

// 404
export class NotFoundError extends Error {
  constructor(message = 'Not Found') {
    super(message);
  }
}

/**
 * Error factory
 */
export class ErrorFactory {
  static badRequest(message?: string) {
    return new BadRequestError(message);
  }
  static unauthorized(message?: string) {
    return new UnauthorizedError(message);
  }
  static forbidden(message?: string) {
    return new ForbiddenError(message);
  }
  static notFound(message?: string) {
    return new NotFoundError(message);
  }
}

/**
 * Error handler, extend to handle more Error types
 */
export function error(error: Error, req: Request, res: Response, next: any) {
  if (error instanceof BadRequestError) {
    res.status(400);
  } else if (error instanceof UnauthorizedError) {
    res.status(401);
  } else if (error instanceof ForbiddenError) {
    res.status(403);
  } else if (error instanceof NotFoundError) {
    res.status(404);
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

export default ErrorFactory;