import { post } from './fetch';


function parseEvent(event): Checkpoints.Event {
  event.startTime = new Date(event.startTime);
  event.endTime = new Date(event.endTime);
  return event as Checkpoints.Event;
}

export function getAllEvents(search: Checkpoints.eventSearch): Promise<Checkpoints.Event[]>{
  return post('/api/events', search).then(res => res.body.events.map(parseEvent));
}

export function getRecommendEvents(search: Checkpoints.eventSearch): Promise<Checkpoints.Event[]>{
  return post('/api/events/recommend', search).then(res => res.body.events.map(parseEvent));
}