const debug = require('debug')('checkpoints:userApi');

import { Router, Request, Response } from 'express';
import { createUser } from '../auth/userAuth';
import { authenticatePublicClient } from '../auth/clientAuth';
import * as accesstoken from '../modules/accesstoken';

const api = Router();

api.post('/register', authenticatePublicClient(), (req: Request, res: Response, next) => {
  const { name, email, password } = req['body'];
  if (!(name && email && password))
    return res.status(400);

  const client = req['user'];
  createUser(email, password, name)
    .then(user => {
      return accesstoken.getToken(user['_id'], client._id)
        .then(token => {
          res.json({
            access_token: token.token,
            token_type: 'Bearer'
          });
        });
    })
    .catch(err => {
      debug(err);
      next(err);
    });
});

export default api;