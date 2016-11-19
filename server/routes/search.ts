const debug = require('debug')('checkpoints:searchRoute');

import { Router, Request, Response } from 'express';

import * as search from '../handlers/search';

const api = Router();

api.get('/', (req: Request, res: Response, next) => {
  search.searchPeople(req, res, next);
});

export default api;