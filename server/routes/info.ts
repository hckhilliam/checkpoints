const debug = require('debug')('checkpoints:infoRoute');

import { Router, Request, Response } from 'express';

import * as info from '../handlers/info';

const api = Router();

api.get('/', (req: Request, res: Response, next) => {
  info.getUserInfo(req, res);
});

export default api;
