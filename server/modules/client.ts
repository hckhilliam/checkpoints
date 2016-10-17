const debug = require('debug')('checkpoints:client');
import Client from '../mongoose/Client';

export function initializeClients() {
  return new Promise(resolve => {
    // Web Client
    Client.findOne({ name: 'web' }, (err, res) => {
      if (!err && res) {
        debug(`Web client id: ${res._id}`);
        return resolve();
      }
      const client = new Client({
        _id: 'checkpoints.web',
        name: 'web'
      });
      client.save().then(c => {
        debug(`Web client id: ${c._id}`);
        resolve();
      });
    });
  });
}

export function checkClient(clientId: string, callback: Function) {
  return Client.findById(clientId, callback);
}
