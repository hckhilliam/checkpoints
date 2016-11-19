const debug = require('debug')('checkpoints:searchHandler');

import { Request, Response } from 'express';

import * as search from '../modules/search';
import * as friend from '../modules/friend';
import { getUserId, getFacebookId } from '../lib/request';
import { userSort } from '../lib/sort';

export function searchPeople(req: Request, res: Response, next: any) {
  const searchQuery = req.query['searchQuery'];
  const userId = getUserId(req);
  Promise.all([
    search.searchPeople(userId, searchQuery),
    friend.getFriends(userId)
  ]).then(values => {
    let [filteredPeople, friends] = values;

    debug(filteredPeople);
    
    let result = [];
    let count = 0;
    for (let i = 0; count < 10 && i < friends.length; ++i) {
      let friend = friends[i];
      if (filteredPeople.some(u => u._id == friend._id)) {
        result.push(friend);
        ++count;
      }
    }

    for (let i = 0; count < 10 && i < filteredPeople.length; ++i) {
      let user = filteredPeople[i];
      if (!result.some(f => f._id == user._id)) {
        result.push(user);
        ++count;
      }
    }
    res.json(result);
  }).catch(next);
}