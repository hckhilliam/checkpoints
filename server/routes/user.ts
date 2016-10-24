const debug = require('debug')('checkpoints:userApi');

import { Router, Request, Response } from 'express';
import { createUser } from '../auth/userAuth';
import { createAccessToken } from '../auth/tokenAuth';
import { authenticatePublicClient } from '../auth/clientAuth';

const api = Router();

api.post('/register', authenticatePublicClient(), (req: Request, res: Response) => {
  const { name, email, password } = req['body'];
  if (!(name && email && password))
    return res.status(400);

  const client = req['user'];
  createUser(email, password, name)
    .then(user => {
      return createAccessToken(user['_id'], client._id, 60 * 24 * 3600)
        .then(token => {
          res.json({
            access_token: token,
            token_type: 'Bearer'
          });
        });
    })
    .catch(err => {
      res.status(500);
      res.json(err);
    });
});

export default api;