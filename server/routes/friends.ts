const debug = require('debug')('checkpoints:friendsRoute');

import { Router, Request, Response } from 'express';

import * as friends from '../handlers/friends';

const api = Router();

api.post('/add/:_id', (req: Request, res: Response, next) => {
  friends.addFriend(req, res, next);
});

api.get('/', (req: Request, res: Response, next) => {
  friends.getFriends(req, res, next);
});

api.get('/requests', (req: Request, res: Response, next) => {
  friends.getFriendRequests(req, res, next);
});

api.post('/respond/:_id', (req: Request, res: Response, next) => {
  friends.respondToRequest(req, res, next);
});

api.delete('/:_id', (req: Request, res: Response, next) => {
  friends.removeFriend(req, res, next);
});

export default api;