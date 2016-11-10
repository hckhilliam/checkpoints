import * as mongoose from 'mongoose';
const autoIncrement = require('mongoose-auto-increment');

const facebookUserSchema = new mongoose.Schema({
  _id: false,
  id: String,
  email: String,
  name: String
});

const accountsSchema = new mongoose.Schema({
  _id: false,
  facebook: facebookUserSchema
});

const pictureSchema = new mongoose.Schema({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  url: { type: String, required: true }
});

const schema = {
  _id: Number,
  email: { type: String, required: true, unique: true },
  password: String,
  name: { type: String, required: true },
  friends: [Number],
  friendRequests: [Number],
  accounts: accountsSchema,
  picture: pictureSchema
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