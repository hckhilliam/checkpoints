const debug = require('debug')('checkpoints:oauth2');
const oauth2orize = require('oauth2orize');

import * as passport from 'passport';

import { checkUser } from './userAuth';
import { createAccessToken } from './tokenAuth';

const server = oauth2orize.createServer();

server.exchange(oauth2orize.exchange.password((client, username, password, scope, done) => {
  debug('exchange password', client, username, password);

  // Validate user
  checkUser(username, password)
    .then(user => {
      if (!user)
        return done(null, false);

      createAccessToken(user['_id'], client._id, 60 * 24 * 3600)
        .then(token => done(null, token))
        .catch(err => done(err));
    })
    .catch(err => done(err));
}));

export default server;