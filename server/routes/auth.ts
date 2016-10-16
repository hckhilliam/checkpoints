import { Router, Request, Response } from 'express';
import { authenticateFacebook } from '../auth/facebookAuth';

const api = Router();

api.get('/facebook', authenticateFacebook(), (req: Request, res: Response) => {
  res.redirect('/');
});

api.get('/logout', (req: Request, res: Response) => {
  // todo
  res.redirect('/');
});

export default api;
