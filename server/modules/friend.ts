const debug = require('debug')('checkpoints:friend');
import User from '../mongoose/User';
import { GENERIC_USER_DATA } from '../lib/data';

export function getFriends(user_id: number): Promise<CheckpointsServer.User[]> {
  return new Promise((resolve, reject) => {
    User.findById(user_id, { friends: 1 }).then(user => {
      debug(user['friends']);
      User.find({ _id: { $in: user['friends'] } }, GENERIC_USER_DATA)
        .sort('insensitiveName')
        .then(resolve);
    });
  });
}

export function getFriendRequests(user_id: number): Promise<CheckpointsServer.User[]> {
  debug(`Getting all friend requests for user (${user_id})`);
  return new Promise((resolve, reject) => {
    User.findById(user_id, { friendRequests: 1 })
      .then(user => {
        if (!user)
          return reject(new Error('User not found'));
        User.find({ _id: { $in: user['friendRequests'] } }, GENERIC_USER_DATA).then(resolve);
      });
  });
}

// TODO: validation
export function addFriend(user_id: number, friend_id: number) {
  debug(`Sending friend request to ${friend_id} from ${user_id}`);
  return new Promise(resolve => {
    User.findByIdAndUpdate(friend_id, {$addToSet: {friendRequests: user_id}}).then(resolve);
  });
}

// TODO: validation
export function acceptFriend(user_id: number, friend_id: number) {
  debug(`Accepting friend ${friend_id} for ${user_id}`);
  return Promise.all([
    new Promise(resolve => {
      User.findByIdAndUpdate(user_id, {
        $addToSet: {friends: friend_id},
        $pull: {friendRequests: friend_id}
      }).then(resolve);
    }),
    new Promise(resolve => {
      User.findByIdAndUpdate(friend_id, {$addToSet: {friends: user_id}}).then(resolve);
    })
  ]);
}

export function rejectFriend(user_id: number, friend_id: number) {
  debug(`Rejecting friend request from ${friend_id} as ${user_id}`);
  return new Promise(resolve => {
    User.findByIdAndUpdate(user_id, { $pull: { friendRequests: friend_id } }).then(resolve);
  });
}

// TODO: validation
export function removeFriend(user_id: number, friend_id: number) {
  debug(`Removing friend ${friend_id} for ${user_id}`);
  return Promise.all([
    new Promise(resolve => {
      User.findByIdAndUpdate(user_id, { $pull: { friends: friend_id } }).then(resolve);
    }),
    new Promise(resolve => {
      User.findByIdAndUpdate(friend_id, { $pull: { friends: user_id } }).then(resolve);
    })
  ]);
}