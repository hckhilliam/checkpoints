const oauth2orize = require('oauth2orize');
const uid = require('uid-safe');
const debug = require('debug')('checkpoints:oauth2');

import { authenticateUser } from './auth/userAuth';
import { checkClient } from './modules/client';
import AccessToken from './mongoose/AccessToken';

const server = oauth2orize.createServer();

/**
 * Generates a 256 length token
 */
function generateToken() {
  return uid(192);
}

function upsertToken(userId, clientId, done) {
  // todo expire tokens
  AccessToken.findOne({ userId, clientId }).then(res => {
    if (res) {
      const token = res['token'];
      debug(`Token retrieved for user (${userId}), client (${clientId}), token (${token})`);
      return done(null, token);
    } else {
      uid(192).then(token => {
        const accessToken = new AccessToken({
          token,
          userId: userId,
          clientId: clientId
        });
        accessToken.save().then(() => {
          debug(`Token generated for user (${userId}), client (${clientId}), token (${token})`);
          done(null, token);
        }).catch(err => {
          done(err);
        });
      });
    }
  }).catch(err => {
    debug(`Error getting access token: ${err}`);
    done(err);
  });
}

server.serializeClient((client, done) => {
  debug(`Serialized client ${client._id}`);
  return done(null, client.id);
});

server.deserializeClient((id, done) => {
  checkClient(id, (err, client) => {
    if (err)
      return done(err);
    return done(null, client);
  });
});

server.grant(oauth2orize.grant.token((client, user, ares, done) => {
  debug(client);
  const user_id = user._id;
  const client_id = client._id;
  upsertToken(user.email, client._id, done);
}));

server.exchange(oauth2orize.exchange.password((client, username, password, scope, done) => {
  // Check client
  checkClient(client._id, (err, c) => {
    if (err)
      return done(err);
    if (!c)
      return done(null, false);

    // Validate user
    authenticateUser(username, password)
      .then(user => {
        if (!user)
          return done(null, false);

        upsertToken(username._id, client._id, done);
      })
      .catch(err => done(err));
  });
}));