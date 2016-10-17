import * as mongoose from 'mongoose';

const facebookUserSchema = new mongoose.Schema({
  _id: String,
  user_id: { type: String, required: true, unique: true },
  email: String,
  name: String
});

const FacebookUser = mongoose.model('FacebookUser', facebookUserSchema);
export default FacebookUser;