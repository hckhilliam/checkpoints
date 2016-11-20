import {
  UPDATE_FLIGHTS,
  FlightUpdate,
} from '../actions/flights';


export default function reducer(state: Checkpoints.Flight[] = [], action: Redux.Action) {
  switch (action.type) {
    case UPDATE_FLIGHTS:
      return (action as FlightUpdate).flights;
    default:
      return state;
  }
}