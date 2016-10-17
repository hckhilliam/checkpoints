const debug = require('debug')('checkpoints:token');
const uid = require('uid-safe');

import AccessToken from '../mongoose/AccessToken';

/**
 * Generates a 256 length token
 */
function generateToken() {
  return uid(192);
}

export function createAccessToken(userId, clientId, expires) {
  return generateToken().then(token => {
    return insertAccessToken(token, userId, clientId, expires);
  });
}

export function insertAccessToken(token, userId, clientId, expires) {
  return new Promise((resolve, reject) => {
    const accessToken = new AccessToken({
      token,
      user_id: userId,
      client_id: clientId,
      expires: Date.now() + expires * 1000
    });
    accessToken.save().then(() => {
      debug(`Token generated for user (${userId}), client (${clientId}), token (${token})`);
      resolve(token);
    }).catch(err => {
      reject(err);
    });
  });
}

// todo remove
export function upsertAccessToken(userId, clientId, expires) {
  return new Promise((resolve, reject) => {
    // todo expire tokens
    AccessToken.findOne({ user_id: userId, client_id: clientId }).then(res => {
      if (res) {
        const token = res['token'];
        debug(`Token retrieved for user (${userId}), client (${clientId}), token (${token})`);
        return resolve(token);
      } else {
        createAccessToken(userId, clientId, expires)
          .then(token => resolve(token))
          .catch(err => reject(err));
      }
    }).catch(err => {
      debug(`Error getting access token: ${err}`);
      reject(err);
    });
  });
}