import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
  facebookId: { type: String, required: true, unique: true },
  token: { type: String, required: true },
  expires: { type: Date, required: true }
});

schema.index({ expires: 1 }, { expireAfterSeconds: 0 });

const FacebookToken = mongoose.model('FacebookToken', schema);
export default FacebookToken;