const debug = require('debug')('checkpoints:me');

import { Router, Request, Response } from 'express';

import { getCheckpoints, createCheckpoint } from './checkpoint';

const api = Router();

function getUserId(req: Request): number {
  return req['user']['_id'];
}

api.get('/info', (req: Request, res: Response) => {
  const { _id, name } = req['user'];
  res.json({
    id: _id,
    name
  });
});

api.get('/checkpoints', (req: Request, res: Response, next) => {
  getCheckpoints(res, getUserId(req));
});

api.post('/checkpoint', (req: Request, res: Response, next) => {
  const { title, description, isPrivate } = req['body'];
  createCheckpoint(res, getUserId(req), title, description, !!isPrivate);
});

export default api;
