const debug = require('debug')('checkpoints:accesstokenModule');
const uid = require('uid-safe');

import AccessToken from '../mongoose/AccessToken';

/**
 * Generates a 256 length token
 */
function generateToken(): Promise<string> {
  return uid(192);
}

export function getToken(userId: number, clientId: string): Promise<CheckpointsServer.Token> {
  return AccessToken.findOne({ user_id: userId, client_id: clientId }).then(doc => {
    const expires = Date.now() + (60 * 24 * 3600) * 1000; // 60 days
    if (doc) {
      (doc as any).expires = new Date(expires);
      debug(`Token refreshed for user (${userId}), client (${clientId})`);
      return doc.save();
    } else {
      return generateToken().then(token => {
        debug(`Token generated for user (${userId}), client (${clientId})`);
        const accessToken = new AccessToken({
          token,
          user_id: userId,
          client_id: clientId,
          expires
        });
        return accessToken.save();
      });
    }
  });
}

export function getUserFromToken(token: string): Promise<CheckpointsServer.User> {
  return AccessToken.findOne({ token }).populate('user_id')
    .then(accesstoken => {
      if (!accesstoken)
        throw new Error(`Invalid token ${token}`);
      return accesstoken['user_id'];
    });
}
