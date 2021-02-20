var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema(
    {
        title: {type: String, required: true},
        author: {type: Schema.Types.ObjectId, ref: 'Author'},
        summary: {type: String, required: true},
        content: {type: Schema.Types.ObjectId, ref: 'Content'},
        date_created: {type: Date, default: Date.now},
        topics: {type: Schema.Types.ObjectId, ref: 'Topic'},
        comments: {type: Schema.Types.ObjectId, ref: 'Comment'}
    }
);


// Virtual for post's URL
AuthorSchema
    .virtual('url')
    .get(function() {
        return '/post/' + this._id;
    });

//Export model
module.exports = mongoose.model('Post', PostSchema);