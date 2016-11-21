const debug = require('debug')('checkpoints:eventmatch');
import { EmailTemplate } from 'email-templates';
import * as path from 'path';
import { getSubscribedUsers } from '../modules/user';
import { searchUserEvents, eventCriteria } from '../modules/event';
import { createMail } from './mailer';


export function matchEvents(){
  getSubscribedUsers().then(result => {
    let users: CheckpointsServer.User[] = result;
    users.forEach(user => {
      sendUserEvents(user);
    });
  });
}

function sendUserEvents(user: CheckpointsServer.User) {
  let search: eventCriteria = {
    lat: 43.4761238,
    lng: -80.5378432,
    distance: 700,
    filter: undefined
  }
  searchUserEvents(user, search).then(events => {
    let eventsIDs = events.map(event => event.id);
    if (!(_.isEmpty(eventsIDs))) {
      buildEmail(user, eventsIDs);
    }
  });
}

function buildEmail(user: CheckpointsServer.User, eventIds:number[]) {
  const subject = `Recommended Events`;
  const { name, email } = user;

  let eventListing: string[] = [];
  eventIds.forEach(id => {
    eventListing.push(`https://www.facebook.com/events/${id}`);
  });

  let template = new EmailTemplate(path.join(__dirname, '..', 'templates', 'events-email'));

  template.render({
    name: name,
    events: eventListing,
    subject: subject
  }, (err, result) => {
    if (err) { debug(err); }
    else { createMail(email, result.subject, result.text, result.html); }
  });
}
