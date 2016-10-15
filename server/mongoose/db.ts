import * as mongoose from 'mongoose';
const autoIncrement = require('mongoose-auto-increment');
const debug = require('debug')('checkpoints:mongodb');

export function initialize() {
  const uri = process.env['MONGODB'];
  return new Promise(resolve => {
    mongoose.connect(uri, () => {
      debug(`Connected to MongoDB at ${uri}`);
      autoIncrement.initialize(mongoose.connection);
      resolve();
    });
  });
}
