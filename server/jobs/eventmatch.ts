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

  let eventListing: string = "";
  eventIds.forEach(id => {
    eventListing += `<p>https://www.facebook.com/events/${id}</p>`;
  });

  let textBody = `llalal`;
  let htmlBody = `
    <p>Hi ${name}, </p>
    <br/>
    <h3>We'd like to recommend you some events based on your goals</h3>
    ${eventListing}
    <h1>😉</h1>
  `;
  createMail(email, subject, textBody, htmlBody);
}
