const debug = require('debug')('checkpoints:me');

import { Router, Request, Response } from 'express';

import { getCheckpoints, createCheckpoint } from './checkpoint';

import * as checkpoints from '../handlers/checkpoints';

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

api.get('/checkpoints', (req, res, next) => {
  checkpoints.getCheckpoints(req, res, next, getUserId(req));
});

api.get('/checkpoints/:id', (req, res, next) => {
  const id = req.params['id'];
  checkpoints.getCheckpoint(req, res, next, id);
});

api.post('/checkpoints', (req, res, next) => {
  checkpoints.createCheckpoint(req, res, next, getUserId(req));
});

api.put('/checkpoints/:id', (req, res, next) => {
  const id = req.params['id'];
  checkpoints.updateCheckpoint(req, res, next, id);
});

api.delete('/checkpoints/:id', (req, res, next) => {
  const id = req.params['id'];
  checkpoints.deleteCheckpoint(req, res, next, id);
});

api.post('/checkpoints/:id/upload', (req, res, next) => {
  const id = req.params['id'];
  checkpoints.uploadCheckpointImages(req, res, next, getUserId(req), id);
});

export default api;
