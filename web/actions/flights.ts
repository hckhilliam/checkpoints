import { Action } from 'redux';
import { queryFlights } from '../lib/api/flights';

export const UPDATE_FLIGHTS: string = 'UPDATE_FLIGHTS';

export interface FlightUpdate extends Action {
  flights: Checkpoints.Flight[];
}

export function getFlights() {
  return dispatch => {
    return queryFlights().then(res => {
      dispatch(updateFlights(res));
    });
  }
}

function updateFlights(flights: Checkpoints.Flight[]): FlightUpdate {
  return {
    type: UPDATE_FLIGHTS,
    flights
  } as FlightUpdate;
}