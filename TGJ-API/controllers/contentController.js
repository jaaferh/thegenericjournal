var Content = require('../models/content');

// ALL CONTENTS GET
exports.content_list = function(req, res) {
    res.send('NOT IMPLEMENTED: content list');
};

// CONTENT DETAIL GET
exports.content_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: content detail: ' + req.params.id);
};

// CREATE POST.
exports.content_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: content create POST');
};

// DELETE POST.
exports.content_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: content delete POST');
};

// UPDATE POST.
exports.content_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: content update POST');
};
