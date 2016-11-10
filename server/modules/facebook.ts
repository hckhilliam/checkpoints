const debug = require('debug')('checkpoints:facebookModule');

const FB = require('fb');

import FacebookToken from '../mongoose/FacebookToken';

interface FBToken {
  token: string;
  expires: Date;
}

export function exchangeFacebookToken(exchangeToken: string): Promise<FBToken> {
  return new Promise((resolve, reject) => {
    FB.api('oauth/access_token', {
      client_id: process.env['FACEBOOK_APP_ID'],
      client_secret: process.env['FACEBOOK_APP_SECRET'],
      grant_type: 'fb_exchange_token',
      fb_exchange_token: exchangeToken
    }, res => {
      if (!res || res.error) {
        debug('facebook error', !res ? 'error' : res.error);
        return reject(new Error(JSON.stringify(!res ? 'error' : res.error.message)));
      }
      resolve({
        token: res.access_token,
        expires: Date.now() + res.expires * 1000
      });
    });
  });
}

export function saveFacebookToken(facebookId: string, token: string, expires: Date): Promise<FBToken> {
  return FacebookToken.findOne({ facebookId })
    .then(res => {
      let deferred;
      if (res) {
        res.set('token', token);
        res.set('expires', expires);
        deferred = res.save();
      } else {
        deferred = FacebookToken.create({ facebookId, token, expires})
      }
      return deferred.then(res => _.pick(res, 'token', 'expires'));
    });
}