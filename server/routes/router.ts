import * as express from 'express';
import * as path from 'path';

import api from './api';

export function setRoutes(app: express.Application) {
  app.use('/api', api);

  // send index.html
  app.all('/*', (req, res) => {
    res.sendFile('index.html', { root: 'web/dist' });
  });
}