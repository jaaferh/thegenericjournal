/*
const mongoose = require('mongoose');
// const Container = require('./container');

const { Schema } = mongoose;

// const TextContainer = Container.discriminator('TextContainer', new Schema(
//   {
//     text: { type: String, required: true },
//   },
// ));

// module.exports = mongoose.model('TextContainer', TextContainer);

const TextContainerSchema = new Schema(
  {
    type: {
      type: String, required: true, enum: ['Text', 'Image'], default: 'Text',
    },
    text: { type: String, required: true },
  },
);

module.exports = mongoose.model('TextContainer', TextContainerSchema);
*/
