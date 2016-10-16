import * as express from 'express';
import * as path from 'path';

export function setRoutes(app: express.Application) {
  app.use('/api', require('./api').default);

  // send index.html
  app.all('/*', (req, res) => {
    res.sendFile('index.html', { root: 'web/dist' });
  });
}