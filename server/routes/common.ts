const debug = require('debug')('checkpoints:commonRoute');

import { Router } from 'express';

import checkpoints from './checkpoints';
import info from './info';

const api = Router();

api.use('/checkpoints', checkpoints);
api.use('/info', info);

export default api;