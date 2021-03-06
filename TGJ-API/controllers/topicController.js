const async = require('async');
const Topic = require('../models/topic');

// ALL TOPICS GET
exports.topic_list = (req, res, next) => {
  Topic.find()
    .sort([['name', 'ascending']])
    .exec((err, listTopics) => {
      if (err) { return next(err); }
      // Successful
      return res.send(listTopics);
    });
};

// CREATE POST.
exports.topic_create_post = function (req, res) {
  res.send('NOT IMPLEMENTED: topic create POST');
};

// DELETE POST.
exports.topic_delete_post = function (req, res) {
  res.send('NOT IMPLEMENTED: topic delete POST');
};

// UPDATE POST.
exports.topic_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: topic update POST');
};
