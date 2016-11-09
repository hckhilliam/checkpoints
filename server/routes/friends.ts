const debug = require('debug')('checkpoints:friendsRoute');

import { Router, Request, Response } from 'express';

import * as friends from '../handlers/friends';

const api = Router();

api.post('/friends/add/:_id', (req: Request, res: Response, next) => {
  friends.addFriend(req, res, next);
});

api.get('/friends', (req: Request, res: Response, next) => {
  friends.getFriends(req, res, next);
});

api.get('/friends/requests', (req: Request, res: Response, next) => {
  friends.getFriendRequests(req, res, next);
});

api.post('/friends/respond/:_id', (req: Request, res: Response, next) => {
  friends.respondToRequest(req, res, next);
});

api.delete('/friends/:_id', (req: Request, res: Response, next) => {
  friends.removeFriend(req, res, next);
});

export default api;