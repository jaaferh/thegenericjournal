const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContainerSchema = new Schema(
  {
    type: {
      type: String, required: true, enum: ['Text', 'Image'], default: 'Text',
    },
    text: { type: String },
    image_url: { type: String },
    caption: { type: String },
  },
);

// Export model
module.exports = mongoose.model('Container', ContainerSchema);
