const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    summary: { type: String, required: true },
    content: {
      containers: [{ type: Schema.Types.ObjectId, ref: 'Container', required: true }],
      last_edited: { type: Date, default: null },
    },
    date_created: { type: Date, default: Date.now },
    topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    admin: { type: Boolean, default: false },
  },
);

// Index for title and summary search
PostSchema.index({ title: 'text', summary: 'text' });

// Export model
module.exports = mongoose.model('Post', PostSchema);
