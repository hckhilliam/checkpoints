import {Router, Request, Response} from 'express';
import * as event from '../modules/event';
import {eventCriteria} from '../modules/event'

const api = Router();

api.post('/', (req: Request, res: Response, next) => {
  let facebookToken: string = (req.headers["authorization"] as string).split(" ")[1];
  
  let criteria: eventCriteria = Object.assign({}, req['body'] as eventCriteria);
  criteria.accessTokens = {"facebook": req['body'].FacebookToken};
  
  event.getFilteredEvents(criteria).then( (events) => {
      res.json({
        events
      });
    });
});

export default api;