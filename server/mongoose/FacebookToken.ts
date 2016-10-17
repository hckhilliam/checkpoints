import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
  facebook_token: { type: String, required: true, unique: true },
  access_token: { type: String, required: true },
  user_id: { type: Number, required: true },
  facebook_id: { type: Number, required: true },
  expires: { type: Date, required: true }
});
const FacebookToken = mongoose.model('FacebookToken', schema);
export default FacebookToken;