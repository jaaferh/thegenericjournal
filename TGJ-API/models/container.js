const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContainerSchema = new Schema(
  {
    type: {
      type: String, required: true, enum: ['Text', 'Image'], default: 'Text',
    },
    text: { type: String, default: null },
    image_url: { type: String, default: null },
    caption: { type: String, default: null },
  },
);

// Export model
module.exports = mongoose.model('Container', ContainerSchema);
