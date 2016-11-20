import * as mongoose from 'mongoose';

const pictureSchema = new mongoose.Schema({
  _id: false,
  width: { type: Number, required: true, default: 200 },
  height: { type: Number, required: true, default: 200 },
  url: { type: String, required: true, default: process.env['DEFAULT_PICTURE'] }
});

export default pictureSchema;