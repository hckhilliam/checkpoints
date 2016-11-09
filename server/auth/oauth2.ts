const debug = require('debug')('checkpoints:oauth2');
const oauth2orize = require('oauth2orize');

import * as passport from 'passport';

import { checkUser } from './userAuth';
import * as accesstoken from '../modules/accesstoken';

const server = oauth2orize.createServer();

function reject() {
  return new oauth2orize.TokenError('Unauthorized', 'invalid_client');
}

server.exchange(oauth2orize.exchange.password((client, username, password, scope, done) => {
  debug('exchange password', client, username, password);

  // Validate user
  checkUser(username, password)
    .then(user => {
      if (!user)
        return done(reject());

      return accesstoken.getToken(user['_id'], client._id)
        .then(token => done(null, token.token))
        .catch(err => done(reject()));
    })
    .catch(err => done(reject()));
}));

export default server;