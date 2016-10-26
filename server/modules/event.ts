const EventSearch = require('facebook-events-by-location-core');

export interface eventCriteria {
  lng: number;
  lat: number;
  distance: number;
  filter: string;
  accessTokens: {[id: string] : string};
}

export function getFilteredEvents(search: eventCriteria): Promise<Checkpoints.Event[]> {
  let filter = search.filter;
  return getFBEventsByLocation(search).then((events: Checkpoints.Event[]) => {
    return events.filter((event) => {
      if (filter && event.name.search(new RegExp(filter, 'i')) == -1 && event.description.search(new RegExp(filter, 'i')) == -1) {
        return false;
      }
      if (event.distance > search.distance) {
        return false;
      }
      return true;
    });
  });
}

export function getFBEventsByLocation(search: eventCriteria): Promise<Checkpoints.Event[]> {
  var eventQuery = new EventSearch({ 
    lng: search.lng,
    lat: search.lat,
    distance: search.distance,
    accessToken: search.accessTokens["facebook"]
  });
  return eventQuery.search().then((events) => {
    return events.events.map(normalizeFacebookEvent) ;
  });
}

function normalizeFacebookEvent(fbEvent): Checkpoints.Event {
  fbEvent.eventSource = "Facebook";
  return fbEvent;
}