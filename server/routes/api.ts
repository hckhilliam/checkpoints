import { Router, Request, Response } from 'express';

import auth from './auth';
import user from './user';

const api = Router();

api.get('/hello', (req: Request, res: Response, next) => {
  res.send(':)');
});

api.use('/auth', auth);
api.use('/user', user);

export default api;