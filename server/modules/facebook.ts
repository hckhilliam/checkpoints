const debug = require('debug')('checkpoints:facebookModule');

const FB = require('fb');

import FacebookUser from '../mongoose/FacebookUser';
import FacebookToken from '../mongoose/FacebookToken';

function api(url: string) {
  return FB.api(url);
}

export function upsertFacebookUser(userId, profile) {
  const fbUser = {
    _id: profile.id,
    user_id: userId,
    email: profile.emails[0].value,
    name: profile.displayName
  };

  return new Promise((resolve, reject) => {
    FacebookUser.findOneAndUpdate(
      { _id: fbUser._id },
      fbUser,
      { upsert: true, new: true }
    ).then(facebookUser => {
      resolve(facebookUser);
    }).catch(err => reject(err));
  });
}