const debug = require('debug')('checkpoints:commonRoute');

import { Router, Request, Response } from 'express';

import * as checkpoints from '../handlers/checkpoints';

const api = Router();

api.get('/', (req, res, next) => {
  checkpoints.getCheckpoints(req, res, next);
});

api.get('/:id', (req, res, next) => {
  const id = req.params['id'];
  checkpoints.getCheckpoint(req, res, next, id);
});

api.post('/', (req, res, next) => {
  checkpoints.createCheckpoint(req, res, next);
});

api.put('/:id', (req, res, next) => {
  const id = req.params['id'];
  checkpoints.updateCheckpoint(req, res, next, id);
});

api.delete('/:id', (req, res, next) => {
  const id = req.params['id'];
  checkpoints.deleteCheckpoint(req, res, next, id);
});

api.post('/:id/upload', (req, res, next) => {
  const id = req.params['id'];
  checkpoints.uploadCheckpointImages(req, res, next, id);
});

export default api;