const debug = require('debug')('checkpoints:commonRoute');

import { Router } from 'express';

import checkpoints from './checkpoints';

const api = Router();

api.use('/checkpoints', checkpoints);

export default api;