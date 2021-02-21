var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TopicSchema = new Schema(
    {
        name: {type: String, required: true, minlength: 3, maxlength: 100},
    }
);

// Virtual for topic's URL
TopicSchema
    .virtual('url')
    .get(function () {
        return '/topic/' + this._id;
    });

//Export model
module.exports = mongoose.model('Topic', TopicSchema);