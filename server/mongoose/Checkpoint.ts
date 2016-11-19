const debug = require('debug')('checkpoints:mongooseCheckpoint');

import * as mongoose from 'mongoose';
const autoIncrement = require('mongoose-auto-increment');


const commentSchema = new mongoose.Schema({
  _id: Number,
  user_id: {type: Number, required: true},
  comment: {type: String, required: true}
});

commentSchema.plugin(autoIncrement.plugin, {
  model: 'Comment',
  startAt: 1,
  incrementBy: 1
});

export const Comment = mongoose.model('Comment', commentSchema);


const checkpointSchema = new mongoose.Schema({
  _id: Number,
  user_id: {type: Number, required: true},                        // user checkpoint is associated to
  title: {type: String, required: true},                          // title of checkpoint
  description: String,                                            // a more detailed description of checkpoint
  isPrivate: {type: Boolean, required: true},                     // setting to allow friends to see this checkpoint
  isCompleted: {type: Boolean, required: true, default: false},   // completion flag on whether this checkpoint is completed or not
  notes: String,                                                  // notes on checkpoint completion. eg. links for proof, feels
  pictures: [Number],                                             // pictures attached to this checkpoint
  comments: [commentSchema],                                      // user comments on this checkpoint
  likes: Number,                                                  // number of likes on this checkpoint
  isDeleted: {type: Boolean, required: true, default: false},     // flag for soft deletion of a checkpoint
  createdOn: Date,
  completedOn: Date
});

checkpointSchema.plugin(autoIncrement.plugin, {
  model: 'Checkpoint',
  startAt: 1,
  incrementBy: 1
});

checkpointSchema.pre('save', function (next) {
  debug(`${this}`);
  this.createdOn = new Date();
  next();
});

function completeDate(next) {
  let self = this._update;
  debug(self.isCompleted);
  if (_.isBoolean(self.isCompleted)) {
    if (self.isCompleted) {
      self.completedOn = new Date();
    } else {
      self.completedOn = null;
    }
  }
  next();
}

checkpointSchema.pre('update', completeDate)
      .pre('findOneAndUpdate', completeDate)
      .pre('findByIdAndUpdate', completeDate);


const Checkpoint = mongoose.model('Checkpoint', checkpointSchema);
export default Checkpoint;
