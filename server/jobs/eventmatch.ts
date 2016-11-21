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
    lat: 43.6532,
    lng: -79.3832,
    distance: 7000,
    filter: undefined
  }
  searchUserEvents(user, search).then(checkpointEvents => {
    if (checkpointEvents.length > 0) {
      buildEmail(user, checkpointEvents);
    }
  });
}

function buildEmail(user: CheckpointsServer.User, checkpointEvents: any[]) {
  const subject = `Recommended Events`;
  const { name, email } = user;

  const parsedCheckpointEvents = _.map(checkpointEvents, checkpointEvent => {
    return {
      checkpoint: checkpointEvent.checkpoint.title,
      events: _.map(checkpointEvent.events, event => {
        return {
          name: event['name'],
          link: `https://www.facebook.com/events/${event['id']}`
        }
      })
    };
  });

  let template = new EmailTemplate(path.join(__dirname, '..', 'templates', 'events-email'));

  template.render({
    name: name,
    checkpointEvents: parsedCheckpointEvents,
    subject: subject
  }, (err, result) => {
    if (err) { debug(err); }
    else { createMail(email, result.subject, result.text, result.html); }
  });
}
