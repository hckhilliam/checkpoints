const EventSearch = require('facebook-events-by-location-core');

export function getFilteredEvents(lng: number, lat: number, distance = 10000, filter?: string): Promise<Checkpoints.Event[]> {
  console.log(lng);
  console.log(lat);
  console.log(distance);
  console.log(filter);
  return getFBEventsByLocation(lng, lat, distance).then((events: Checkpoints.Event[]) => {
    return events.map((event) => {
      if (filter && event.name.search(new RegExp(filter, 'i')) == -1 && event.description.search(new RegExp(filter, 'i')) == -1) {
        return false;
      }
      if (event.distance > distance) {
        return false;
      }
      return true;
    });
  });
}

export function getFBEventsByLocation(lng: number, lat: number, distance?: number): Promise<Checkpoints.Event[]> {
  var eventQuery = new EventSearch({ lng, lat, distance });
  return eventQuery.search().then((events) => {
    return events.map(normalizeFacebookEvent);
  });
}

function normalizeFacebookEvent(fbEvent): Checkpoints.Event {
  fbEvent.eventSource = "Facebook";
  return fbEvent;
}