const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    parent_comment: { type: Schema.Types.ObjectId, ref: 'Comment' },
    author_nickname: { type: String, required: true },
    text: { type: String, required: true },
    date_posted: { type: Date, default: Date.now, required: true },
    last_edited: { type: Date },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
  },
);

// Virtual for comment's total points
CommentSchema
  .virtual('points')
  .get(() => this.likes - this.dislikes);

// Export model
module.exports = mongoose.model('Comment', CommentSchema);
