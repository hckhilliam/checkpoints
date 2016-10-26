import {post} from '../lib/api/fetch' 
import {getFacebookToken} from '../lib/auth'

export const UPDATE_EVENTS = 'UPDATE_EVENTS'; 

export function getEvents() {
  // return dispatch => {
    let body = {
      "lat": 40.710803,
      "lng": -73.964040,
      "FacebookToken": getFacebookToken()
    }
    return post('/api/events', body).then((res) => {
      console.log(res);
    });
  // }
}