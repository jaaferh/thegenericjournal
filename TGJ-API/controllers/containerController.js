var TextContainer = require('../models/txtcontainer');
var ImageContainer = require('../models/imgcontainer');

// ALL CONTAINERS GET
exports.container_list = function(req, res) {
    res.send('NOT IMPLEMENTED: container list');
};

// CONTAINER DETAIL GET
exports.container_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: container detail: ' + req.params.id);
};

// CREATE POST.
exports.container_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: container create POST');
};

// DELETE POST.
exports.container_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: container delete POST');
};

// UPDATE POST.
exports.container_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: container update POST');
};
