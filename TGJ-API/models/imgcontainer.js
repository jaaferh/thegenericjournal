/*
const mongoose = require('mongoose');
// const Container = require('./container');

const { Schema } = mongoose;

// const ImageContainer = Container.discriminator('ImageContainer', new Schema(
//   {
//     image_url: { type: String, required: true },
//     caption: { type: String },
//   },
// ));

// module.exports = mongoose.model('ImageContainer', ImageContainer);

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
*/
