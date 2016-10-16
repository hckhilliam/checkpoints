import * as mongoose from 'mongoose';
const autoIncrement = require('mongoose-auto-increment');

const commentSchema = new mongoose.Schema({
    _id: Number,
    user_id: { type: Number, required: true },
    comment: { type: String, required: true }
});

commentSchema.plugin(autoIncrement.plugin, {
    model: 'Comment',
    startAt: 1,
    incrementBy: 1
});

export const Comment = mongoose.model('Comment', commentSchema);


const checkpointSchema = new mongoose.Schema({
    _id: Number,
    user_id: { type: Number, required: true },
    title: { type: String, required: true },
    description: String,
    isPrivate: { type: Boolean, required: true },
    isCompleted: { type: Boolean, required: true, default: false },
    pictures: [{ type: Buffer, contentType: String}],
    comments: [commentSchema],
    likes: Number,
    isDeleted: { type: Boolean, required: true, default: false }
});

checkpointSchema.plugin(autoIncrement.plugin, {
    model: 'Checkpoint',
    startAt: 1,
    incrementBy: 1
});

const Checkpoint = mongoose.model('Checkpoint', checkpointSchema);
export default Checkpoint;
