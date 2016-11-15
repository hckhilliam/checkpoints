import { Router, Request, Response } from 'express';
import { eventCriteria, getFilteredEvents } from '../modules/event';
import { getLocation } from '../modules/location';


const api = Router();

api.post('/', (req: CheckpointsServer.Request & Request, res: Response, next) => {
  let criteria: eventCriteria = req.body;

  let deferred: Promise<eventCriteria> = Promise.resolve(criteria);
  if (!(criteria.lat && criteria.lng)) {
    deferred = getLocation(req).then(location => {
      return Object.assign(criteria, {
        lat: location.lat,
        lng: location.lng
      });
    });
  }
  return deferred.then(
    criteria => {
      return getFilteredEvents(criteria).then((events) => {
        res.json({
          events
        });
      });
  });
});

export default api;