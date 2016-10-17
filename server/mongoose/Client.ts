import * as mongoose from 'mongoose';

const schema = {
  _id: String,
  name: String
};

const clientSchema = new mongoose.Schema(schema);
const Client = mongoose.model('Client', clientSchema);
export default Client;
