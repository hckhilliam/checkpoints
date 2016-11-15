import * as mongoose from 'mongoose';
const autoIncrement = require('mongoose-auto-increment');

const pictureSchema = new mongoose.Schema({
  _id: false,
  width: { type: Number, required: true, default: 200 },
  height: { type: Number, required: true, default: 200 },
  url: { type: String, required: true, default: 'static/default.png' }
});

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

const schema = {
  _id: Number,
  email: { type: String, required: true, unique: true },
  password: String,
  name: { type: String, required: true },
  friends: [Number],
  friendRequests: [Number],
  accounts: accountsSchema,
  picture: { type: pictureSchema, default: pictureSchema }
};

const userSchema = new mongoose.Schema(schema);
userSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  startAt: 1,
  incrementBy: 1
});

userSchema.index({ 'accounts.facebook.id': 'hashed' });

const User = mongoose.model('User', userSchema);
export default User;