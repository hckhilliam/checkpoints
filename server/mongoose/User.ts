const debug = require('debug')('checkpoints:mongooseUser');

import * as mongoose from 'mongoose';
const autoIncrement = require('mongoose-auto-increment');

import pictureSchema from './PictureSchema';

const facebookUserSchema = new mongoose.Schema({
  _id: false,
  id: String,
  email: String,
  name: String,
  picture: pictureSchema
});

const accountsSchema = new mongoose.Schema({
  _id: false,
  facebook: facebookUserSchema
});

const settingsSchema = new mongoose.Schema({
  _id: false,
  isSubscribed: { type: Boolean, default: true }
})

const schema = {
  _id: Number,
  email: { type: String, required: true, unique: true },
  password: String,
  name: { type: String, required: true },
  insensitiveName: { type: String },
  friends: [Number],
  friendRequests: [Number],
  accounts: accountsSchema,
  picture: { type: pictureSchema, default: pictureSchema },
  settings: { type: settingsSchema, default: settingsSchema }
};

const userSchema = new mongoose.Schema(schema);
userSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  startAt: 1,
  incrementBy: 1
});

function updateInsensitiveName(next) {
  let self = this._update;
  debug(self.name);
  if (_.isString(self.name)) {
    self.insensitiveName = self.name.toUpperCase();
  }
  next();
}

userSchema.pre('save', function (next) {
  debug(this.insensitiveName);
  this.insensitiveName = this.name.toUpperCase();
  next();
});

userSchema.pre('update', updateInsensitiveName)
  .pre('findOneAndUpdate', updateInsensitiveName)
  .pre('findByIdAndUpdate', updateInsensitiveName);

userSchema.index({ 'accounts.facebook.id': 'hashed' });

const User = mongoose.model('User', userSchema);
export default User;