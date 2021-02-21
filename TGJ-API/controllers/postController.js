var Post = require('../models/post');

// HOMEPAGE GET
exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// ALL POSTS GET
exports.post_list = function(req, res) {
    res.send('NOT IMPLEMENTED: post list');
};

// POST DETAIL GET
exports.post_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: post detail: ' + req.params.id);
};

// CREATE POST.
exports.post_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: post create POST');
};

// DELETE POST.
exports.post_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: post delete POST');
};

// UPDATE POST.
exports.post_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: post update POST');
};
