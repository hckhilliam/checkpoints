import { Action } from 'redux';
import * as events from '../lib/api/events';

export const UPDATE_EVENTS = 'UPDATE_EVENTS'; 


export interface EventsAction extends Action {
  events: Checkpoints.Event[];
} 

export function getAllEvents(search: Checkpoints.eventSearch) {
  return dispatch => {
    return events.getAllEvents(search).then(events => {
      dispatch(updateEvents(events));
    });
  }
}

export function getRecommendEvents(search: Checkpoints.eventSearch) {
  return dispatch => {
    return events.getRecommendEvents(search).then(events => {
      dispatch(updateEvents(events));
    });
  }
}

function updateEvents (events: Checkpoints.Event[]) {
  return {
    type: UPDATE_EVENTS,
    events
  }
}