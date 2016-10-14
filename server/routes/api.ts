import { Router, Request, Response } from 'express';

const api = Router();

api.get('/hello', (req: Request, res: Response, next) => {
  res.send(':)');
});

export default api;