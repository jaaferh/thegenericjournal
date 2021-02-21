var Comment = require('../models/comment');

// ALL COMMENTS GET
exports.comment_list = function(req, res) {
    res.send('NOT IMPLEMENTED: comment list');
};

// COMMENT DETAIL GET
exports.comment_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: comment detail: ' + req.params.id);
};

// CREATE POST.
exports.comment_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: comment create POST');
};

// DELETE POST.
exports.comment_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: comment delete POST');
};

// UPDATE POST.
exports.comment_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: comment update POST');
};
