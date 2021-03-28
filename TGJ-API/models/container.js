const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContainerSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    type: {
      type: String, required: true, enum: ['Text', 'Image'], default: 'Text',
    },
    title: { type: String, default: null },
    text: { type: String, default: null },
    image_url: { type: String, default: null },
    caption: { type: String, default: null },
  },
);

// Export model
module.exports = mongoose.model('Container', ContainerSchema);
