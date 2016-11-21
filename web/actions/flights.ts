import { Action } from 'redux';
import * as api from '../lib/api/flights';

export const UPDATE_FLIGHTS: string = 'UPDATE_FLIGHTS';

export interface FlightUpdate extends Action {
  flights: Checkpoints.Flight[];
}

export function getFlights() {
  return dispatch => {
    return api.queryFlights().then(res => {
      dispatch(updateFlights(res));
    });
  }
}

export function getRecommendFlights() {
  return dispatch => {
    return api.getRecommendFlights().then(res => {
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