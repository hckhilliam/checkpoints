import { Router, Request, Response } from 'express';
import { getFlightsHandler } from '../handlers/flights';
import { getLocation } from '../modules/location';

const api = Router();

api.post('/', (req: CheckpointsServer.Request & Request, res: Response, next) => {
  
  const { origin, originCode, destination, destinationCode, departureDate } = req['body'];

  let criteria: CheckpointsServer.FlightQuery = {
    origin,
    originCode,
    destination,
    destinationCode,
    departureDate,
  };

  let deffered: Promise<CheckpointsServer.FlightQuery> = Promise.resolve(criteria);

  if (!origin && !originCode) {
    deffered.then(() => {
      getLocation(req).then( (Location) => {
        deffered = Promise.resolve(Object.assign(criteria, {
          origin: Location.country
        }));
      })
    })
  }

  deffered.then((query) => {
    getFlightsHandler(query).then(
      flights => res.json({flights})
    ).catch( err => {
      next(err);
    });
  });

});

export default api;