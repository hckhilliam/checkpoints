import { Router, Request, Response } from 'express';

const debug = require('debug')('checkpoints:api');

const api = Router();

api.get('/hello', (req: Request, res: Response, next) => {
  debug('hello!');
  res.send(':)');
});

api.use('/auth', require('./auth').default);
api.use('/user', require('./user').default);
api.use('/checkpoint', require('./checkpoint').default);

export default api;