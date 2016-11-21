import { CronJob } from 'cron';

import { matchEvents } from './eventmatch';

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

//'00 */1 * * * *' every minute

export const job = new CronJob('00 */1 * * * *', function() {

  matchEvents();

}, null, true, 'America/Los_Angeles');

// export const job = matchEvents;



