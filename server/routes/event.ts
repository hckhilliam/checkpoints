import { Router, Request, Response } from 'express';
import * as event from '../modules/event';
import { eventCriteria } from '../modules/event'

const api = Router();

api.post('/', (req: CheckpointsServer.Request & Request, res: Response, next) => {
  const criteria: eventCriteria = req.body;
  
  event.getFilteredEvents(criteria).then((events) => {
      res.json({
        events
      });
    });
});

export default api;