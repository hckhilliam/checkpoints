const debug = require('debug')('checkpoints:auth');

import { Router, Request, Response } from 'express';
import { login, facebookLogin, facebookCallback } from '../auth/auth';

const api = Router();

api.get('/facebook', facebookLogin);

api.get('/facebook/callback', facebookCallback);

api.get('/logout', (req: Request, res: Response) => {
  // todo revoke access token
  res.sendStatus(200);
});

api.post('/login', login);

export default api;
