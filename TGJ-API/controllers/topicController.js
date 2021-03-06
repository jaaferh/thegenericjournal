var Topic = require('../models/topic');
var async = require('async');

// ALL TOPICS GET
exports.topic_list = function(req, res) {
    Topic.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_topics) {
        if (err) { return next(err); }
        // Successful
        res.send(list_topics);
    });
};

// CREATE POST.
exports.topic_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: topic create POST');
};

// DELETE POST.
exports.topic_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: topic delete POST');
};

// UPDATE POST.
exports.topic_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: topic update POST');
};
