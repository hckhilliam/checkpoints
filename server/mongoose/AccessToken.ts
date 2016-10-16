import * as mongoose from 'mongoose';

const schema = {
  token: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  clientId: { type: String, required: true },
};

const accessTokenSchema = new mongoose.Schema(schema);
const AccessToken = mongoose.model('AccessToken', accessTokenSchema);
export default AccessToken;