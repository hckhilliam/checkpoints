const debug = require('debug')('checkpoints:eventModule');
const EventSearch = require('facebook-events-by-location-core');

import { getAppFacebookToken } from './facebook';
import { getActiveCheckpoints } from '../modules/checkpoint';

export interface eventCriteria {
  lng: number;
  lat: number;
  distance: number;
  filter: string;
}

export function getFilteredEvents(search: eventCriteria): Promise<CheckpointsServer.Event[]> {
  let filter = search.filter;
  return getFBEventsByLocation(search).then((events: CheckpointsServer.Event[]) => {
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

export function getFBEventsByLocation(search: eventCriteria): Promise<CheckpointsServer.Event[]> {
  return getAppFacebookToken().then(accessToken => {
    const eventQuery = new EventSearch({
      lng: search.lng,
      lat: search.lat,
      distance: search.distance,
      accessToken: accessToken.token
    });
    return eventQuery.search().then((events) => events.events.map(normalizeFacebookEvent));
  });

}

function normalizeFacebookEvent(fbEvent): CheckpointsServer.Event {
  fbEvent.eventSource = "Facebook";
  fbEvent.pictureURL = fbEvent.profilePicture;
  return fbEvent;
}

export function searchUserEvents(user: CheckpointsServer.User, search: eventCriteria) {
  return Promise.all([
    getFBEventsByLocation(search),
    getActiveCheckpoints(user._id)
  ]).then((result) => {
    const events = result[0];
    const checkpoints = result[1] as any as CheckpointsServer.Checkpoint[];

    let eventKeys = {};
    let checkpointsToRelevantEvents = [];
    events.forEach(event => {
      let eventNames = event.name.toLowerCase().split(/[ ,."()]+/);
      eventNames.forEach(name => {
        if (eventKeys[name] === undefined) {
          eventKeys[name] = [];
        }
        eventKeys[name].push(event);
      });
    });

    // match checkpoints to events
    checkpoints.forEach(checkpoint => {
      let checkpointItem = {
        checkpoint: checkpoint,
        events: {}
      };
      let keywords = filterWords(checkpoint.title.toLowerCase().split(/[ ,."()]+/));
      let hasResults = false;
      keywords.forEach(key => {
        if (eventKeys[key]) {
          eventKeys[key].forEach(event => {
            checkpointItem.events[event.id] = event;
            hasResults = true;
          });
        }
      });

      if (hasResults) {
        checkpointsToRelevantEvents.push(checkpointItem);
      }
    });

    return Promise.resolve(checkpointsToRelevantEvents);
  });
}

const blacklist = ['a', 'an', 'the', 'and', 'go', 'more', 'to', 'do', 'visit', 'try'];

function filterWords(words: string[]) {
  return _.difference(words, blacklist);
}