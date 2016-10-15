import { Router, Request, Response } from 'express';
import { createUser } from '../modules/user';

const api = Router();

api.get('/create', (req: Request, res: Response, next) => {
  const { name, email } = req.query;
  createUser(name, email).then(user => {
    res.json(user);
  }).catch(error => {
    res.status(500);
    res.json({
      error
    });
  })
});

export default api;