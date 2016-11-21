import { Router, Request, Response } from 'express';
import { getFlightsHandler, searchUserFlights } from '../handlers/flights';
import { getLocation } from '../modules/location';

const api = Router();

api.post('/', (req: CheckpointsServer.Request & Request, res: Response, next) => {
  
  const { originName, originCode, destinationName, destinationCode, departureDate } = req['body'];

  let criteria: CheckpointsServer.FlightQuery = {
    originName,
    originCode,
    destinationName,
    destinationCode,
    departureDate,
  };

  let deffered: Promise<CheckpointsServer.FlightQuery> = Promise.resolve(criteria);

  if (!originName && !originCode) {
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

api.post('/recommend', (req: CheckpointsServer.Request & Request, res: Response, next) => {
  let user = req.user;
  searchUserFlights(user).then(
    flights => res.json({flights})
  );
});

export default api;