var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ContentSchema = new Schema(
    {
        container: {type: Schema.Types.ObjectId, ref: 'Container'},
        last_edited: {type: Date}
    }
);

//Export model
module.exports = mongoose.model('Content', ContentSchema);