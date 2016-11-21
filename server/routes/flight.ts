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

  let deferred: Promise<CheckpointsServer.FlightQuery> = Promise.resolve(criteria);

  if (!originName && !originCode) {
    deferred.then(() => {
      getLocation(req).then(location => {
        deferred = Promise.resolve(Object.assign(criteria, {
          origin: location.country
        }));
      })
    });
  }

  deferred.then((query) => {
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