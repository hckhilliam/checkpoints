import * as mongoose from 'mongoose';
const autoIncrement = require('mongoose-auto-increment');

const schema = {
  _id: Number,
  email: { type: String, required: true, unique: true },
  password: String,
  name: { type: String, required: true },
  friends: [Number],
  friendRequests: [Number],
  facebook_id: { type: String, required: false, unique: true }
};

const userSchema = new mongoose.Schema(schema);
userSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  startAt: 1,
  incrementBy: 1
});

const User = mongoose.model('User', userSchema);
export default User;