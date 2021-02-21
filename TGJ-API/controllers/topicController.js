var Topic = require('../models/topic');

// ALL TOPICS GET
exports.topic_list = function(req, res) {
    res.send('NOT IMPLEMENTED: topic list');
};

// TOPIC DETAIL GET
exports.topic_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: topic detail: ' + req.params.id);
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
