import {Router, Request, Response} from 'express';

import * as event from '../modules/event';

const api = Router();

api.post('/', (req: Request, res: Response, next) => {
  console.log(req);
  console.log(req['body']);
  console.log(req.params);
  console.log(req.params['lng']);
  console.log(req.params['lat']);
  event.getFilteredEvents(
    Number(req.params['lng']), 
    Number(req.params['lat']), 
    Number(req.params['distance']), 
    req.params['filter'] ).then( (events) => {
      res.json({
        events
      });
    });
});

export default api;