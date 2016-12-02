const debug = require('debug')('checkpoints:friendsHandler');

import { Request, Response } from 'express';

import * as friend from '../modules/friend';
import * as facebook from '../modules/facebook';
import { getUserId, getCallerUserId, getFacebookId } from '../lib/request';
import { userSort } from '../lib/sort';
import ErrorFactory from './error';

export function addFriend(req: Request, res: Response, next: any) {
  friend.addFriend(getCallerUserId(req), Number(req.params['_id']))
    .then(friend => res.end())
    .catch(next);
}

export function getFriends(req: Request, res: Response, next: any) {
  friend.getFriends(getUserId(req)).then(friends => {
    debug(friends);
    res.json(friends);
  }).catch(next);
}

export function getFriendRequests(req: Request, res: Response, next: any) {
  friend.getFriendRequests(getCallerUserId(req))
    .then(friendRequests => res.json(friendRequests))
    .catch((err: Error) => {
      if (err.message == 'User not found')
        throw ErrorFactory.notFound(err.message);
      throw err;
    });
}

export function respondToRequest(req: Request, res: Response, next: any) {
  debug(`accept param is ${req.query['accept']}`);
  const userId = getCallerUserId(req);
  if (req.query['accept']) {
    friend.acceptFriend(userId, Number(req.params['_id']))
      .then(() => res.end())
      .catch(next);
  } else {
    friend.rejectFriend(userId, Number(req.params['_id']))
      .then(() => res.end())
      .catch(next);
  }
}

export function removeFriend(req: Request, res: Response, next: any) {
  friend.removeFriend(getCallerUserId(req), Number(req.params['_id']))
    .then(() => res.end())
    .catch(next);
}