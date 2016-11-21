import { post } from './fetch';


function parseFlight(flight): Checkpoints.Flight {
  flight.price = flight.Price;
  flight.departureDate = new Date(flight.departureDate);
  return flight as Checkpoints.Flight;
}

export function queryFlights(): Promise<Checkpoints.Flight[]> {
  let search = {
    destination: 'France',
    origin: 'Canada'
  }
  return post('/api/flights', search).then(res => res.body.flights.map(parseFlight));
}

export function getRecommendFlights(): Promise<Checkpoints.Flight[]> {
  return post('/api/flights/recommend').then(res => res.body.flights.map(parseFlight));
}