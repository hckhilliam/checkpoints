import { CronJob } from 'cron';

import { getAllUsers } from '../modules/user';
import { getFBEventsByLocation } from '../modules/event';
import { getCheckpoints } from '../modules/checkpoint';

// Cron Format
// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    |
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)


export function matchEvents(user: CheckpointsServer.User){
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
                    eventKeys[name][event.name] = true;
                } else {
                    if (eventKeys[name][event.name] === undefined) {
                       eventKeys[name][event.name] = true; 
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

        // console.log("matched events", matchedEvents);
    });
}

//'00 */1 * * * *' every minute
export const job = new CronJob('00 */1 * * * *', function() {

    getAllUsers()
    .then((result) => {
        let users: CheckpointsServer.User[] = result;
        users.forEach(user => {
            matchEvents(user);
        })
    });
}, null, true, 'America/Los_Angeles');



