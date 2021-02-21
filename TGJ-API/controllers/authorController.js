var Author = require('../models/author');

// ALL AUTHORS GET.
exports.author_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Author list');
};

// DETAIL GET.
exports.author_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id);
};

// CREATE POST.
exports.author_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create POST');
};

// DELETE POST.
exports.author_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

// UPDATE POST.
exports.author_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};
