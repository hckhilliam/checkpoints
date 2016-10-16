const debug = require('debug')('auth');

import { Router, Request, Response } from 'express';
import { authenticateFacebook } from '../auth/facebookAuth';
import { authenticateUser } from '../auth/userAuth';
import oauth2 from '../oauth2';

const api = Router();

api.get('/facebook', authenticateFacebook(), (req: Request, res: Response) => {
  res.redirect('/');
});

api.get('/logout', (req: Request, res: Response) => {
  // todo
  res.redirect('/');
});

// api.post('/login', authenticateUser(), (req: Request, res: Response) => {
//   debug('login');
//   res.send('login');
// });
api.post('/login', authenticateUser(), oauth2.token(), oauth2.errorHandler())

export default api;
