const debug = require('debug')('checkpoints:checkpointsEvents');

import { Router, Request, Response } from 'express';
import { eventCriteria, getFilteredEvents, searchUserEvents } from '../modules/event';
import { getLocation } from '../modules/location';


const api = Router();


api.all('*', (req: Request & CheckpointsServer.Request, res: Response, next) => {
  let criteria: eventCriteria = req.body;
  let deferred: Promise<eventCriteria> = Promise.resolve(criteria);
  if (!(criteria.lat && criteria.lng)) {
    debug('lat and lng are not set');
    deferred = getLocation(req).then(location => {
      return Object.assign(criteria, {
        lat: location.lat,
        lng: location.lng
      });
    });
  }
  deferred.then((newBody) => {
    req.body = newBody;
    next();
  });
});


api.post('/recommend', (req: CheckpointsServer.Request & Request, res: Response, next) => {
  let criteria: eventCriteria = req.body;
  let user = req.user;
  searchUserEvents(user, criteria).then((checkpointEvents) => {
    res.json(_.uniqBy(_.flatten(_.map(checkpointEvents, checkpointEvent => _.values(checkpointEvent.events))), 'id'));
  })
});


api.post('/', (req: CheckpointsServer.Request & Request, res: Response, next) => {
  let criteria: eventCriteria = req.body;
  getFilteredEvents(criteria).then((events) => {
    res.json({
      events
    });
  })
});

export default api;