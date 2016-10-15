import * as mongoose from 'mongoose';
const autoIncrement = require('mongoose-auto-increment');

const schema = {
  _id: Number,
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  accessToken: String,
  fbId: String
};

const userSchema = new mongoose.Schema(schema);
userSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  startAt: 1,
  incrementBy: 1
});

const User = mongoose.model('User', userSchema);
export default User;