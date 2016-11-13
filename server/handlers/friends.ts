const debug = require('debug')('checkpoints:friendsHandler');

import { Request, Response } from 'express';

import * as friend from '../modules/friend';
import { getUserId } from '../lib/request';

export function addFriend(req: Request, res: Response, next: any) {
  friend.addFriend(getUserId(req), Number(req.params['_id']))
    .then(friend => res.json(friend))
    .catch(next);
}

export function getFriends(req: Request, res: Response, next: any) {
  friend.getFriends(getUserId(req))
    .then(friends => res.json(friends))
    .catch(next);
}

export function getFriendRequests(req: Request, res: Response, next: any) {
  friend.getFriendRequests(getUserId(req))
    .then(friendRequests => res.json(friendRequests))
    .catch(next);
}

export function respondToRequest(req: Request, res: Response, next: any) {
  debug(`accept param is ${req.query['accept']}`);
  if (req.query['accept']) {
    friend.acceptFriend(getUserId(req), Number(req.params['_id']))
      .then(() => res.end())
      .catch(next);
  } else {
    friend.rejectFriend(getUserId(req), Number(req.params['_id']))
      .then(() => res.end())
      .catch(next);
  }
}

export function removeFriend(req: Request, res: Response, next: any) {
  friend.removeFriend(getUserId(req), Number(req.params['_id']))
    .then(() => res.end())
    .catch(next);
}