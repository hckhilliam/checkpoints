import { Router, Request, Response } from 'express';
import { authenticateFacebook } from '../modules/auth';

const api = Router();

api.get('/facebook', authenticateFacebook());

api.get('/facebook/callback', authenticateFacebook(), (req: Request, res: Response) => {
  res.redirect('/');
});

export default api;