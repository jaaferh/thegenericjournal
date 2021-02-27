var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ContentSchema = new Schema(
    {
        container: [{type: Schema.Types.ObjectId, ref: 'Container', required: true}],
        last_edited: {type: Date, required: true}
    }
);

//Export model
module.exports = mongoose.model('Content', ContentSchema);