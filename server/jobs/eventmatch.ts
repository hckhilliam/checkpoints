import { getAllUsers } from '../modules/user';
import { getFBEventsByLocation } from '../modules/event';
import { getCheckpoints } from '../modules/checkpoint';
import { createMail } from './mailer';


export function matchEvents(){
    getAllUsers()
    .then(result => {
        let users: CheckpointsServer.User[] = result;
        users.forEach(user => {
            searchEvents(user);
        })
    });
}

function searchEvents(user: CheckpointsServer.User){
    Promise.all([
        getFBEventsByLocation({
            lat: 43.4761238,
            lng: -80.5378432,
            distance: 700,
            filter: undefined
        }),
        getCheckpoints(user._id)
    ]).then((result) => {
        const events = result[0];
        const checkpoints = result[1] as any as CheckpointsServer.Checkpoint[];
        
        let eventKeys = {};
        let matchedEvents = {};
        
        events.forEach(event => {
            let eventNames = event.name.toLowerCase().split(/[ ,."()]+/);
            eventNames.forEach(name => {
                if (eventKeys[name] === undefined) {
                    eventKeys[name] = {};
                    eventKeys[name][event.id] = true;
                } else {
                    if (eventKeys[name][event.id] === undefined) {
                       eventKeys[name][event.id] = true; 
                    }  
                }
            });
            // match checkpoints to events
            checkpoints.forEach(checkpoint => {
                //TODO replace title with tags/keywords
                if (eventKeys[checkpoint.title]) {
                    _.merge(matchedEvents, eventKeys[checkpoint.title]);
                }
            });
        })

        buildEmail(user, Object.keys(matchedEvents));
        // console.log("matched events", matchedEvents);
    });
}

function buildEmail(user: CheckpointsServer.User, eventIds:string[]) {
    const subject = "Recommended Events";
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
    createMail(email,  subject, textBody, htmlBody);
}
