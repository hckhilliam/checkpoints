import { post } from './fetch';


function parseEvent(event): Checkpoints.Event {
  event.startTime = new Date(event.startTime);
  event.endTime = new Date(event.endTime);
  return event as Checkpoints.Event;
}

export function getEvents(search: Checkpoints.eventSearch): Promise<Checkpoints.Event[]>{
  return post('/api/events', search).then(res => res.body.events.map(parseEvent));
}