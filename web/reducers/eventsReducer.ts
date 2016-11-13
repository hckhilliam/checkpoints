import {
  UPDATE_EVENTS,
  EventsAction
} from '../actions/events';  

export default function reducer(state: Checkpoints.Event[] = [], action: Redux.Action) {
  switch (action.type) {
    case UPDATE_EVENTS:
      return (action as EventsAction).events;
    default: return state;
  }
}

