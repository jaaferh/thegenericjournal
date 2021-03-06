const mongoose = require('mongoose');

const { Schema } = mongoose;

const ImageContainerSchema = new Schema(
  {
    type: {
      type: String, required: true, enum: ['Text', 'Image'], default: 'Text',
    },
    image_url: { type: String, required: true },
    caption: { type: String },
  },
);

module.exports = mongoose.model('ImageContainer', ImageContainerSchema);
