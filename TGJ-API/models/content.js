/*
const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContentSchema = new Schema(
  {
    container: [{ type: Schema.Types.ObjectId, ref: 'Container', required: true }],
    last_edited: { type: Date, required: true },
  },
);

// Export model
module.exports = mongoose.model('Content', ContentSchema);
*/

/*
const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContainerSchema = new Schema(
  { }, { discriminatorKey: 'type' },
);

const ContentSchema = new Schema(
  {
    containers: [ContainerSchema],
    last_edited: { type: Date },
  },
);
ContentSchema.path('containers').discriminator('Text', new Schema({
  text: { type: String, required: true },
}));
ContentSchema.path('containers').discriminator('Image', new Schema({
  img_url: { type: String, required: true },
  caption: { type: String },
}));

module.exports = mongoose.model('Content', ContentSchema);
*/
