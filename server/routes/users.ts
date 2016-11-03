const debug = require('debug')('checkpoints:users');

import { Router, Request, Response } from 'express';

const api = Router();

api.get('/info', (req: Request, res: Response) => {
  const { _id, name } = req['user'];
  res.json({
    id: _id,
    name
  });
});

export default api;
