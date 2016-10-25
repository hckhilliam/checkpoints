const debug = require('debug')('checkpoints:me');

import { Router, Request, Response } from 'express';

const api = Router();

api.get('/hello', (req: Request, res: Response) => {
  res.send(`Hey ${req['user'].name} ${req['user']._id}!`);
})

api.get('/checkpoints', (req: Request, res: Response, next) => {

});

api.get('/checkpoints/:_id', (req: Request, res: Response, next) => {

});

export default api;
