import { Router, Request, Response } from 'express';
import { createUser } from '../auth/userAuth';

const api = Router();

api.get('/create', (req: Request, res: Response, next) => {
  const { name, email, password } = req.query;
  createUser(email, password, name)
    .then(user => {
      res.json({
        _id: user['_id'],
        email: user['email'],
        name: user['name']
      });
    })
    .catch(err => {
      res.status(500);
      res.json(err);
    });
});

api.post('/register', (req: Request, res: Response) => {
  const { name, email, password } = req['body'];
  if (!(name && email && password))
    return res.status(400);

  createUser(email, password, name)
    .then(user => {
      res.json({
        _id: user['_id'],
        email: user['email'],
        name: user['name']
      });
    })
    .catch(err => {
      res.status(500);
      res.json(err);
    });
});

export default api;