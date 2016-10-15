import { Router, Request, Response } from 'express';
import { authenticateFacebook } from '../modules/auth';

const api = Router();

api.get('/facebook/callback', authenticateFacebook(), (req: Request, res: Response) => {
  res.redirect('/');
});

api.get('/logout', (req: Request, res: Response) => {
  // todo
  res.redirect('/');
});

export default api;