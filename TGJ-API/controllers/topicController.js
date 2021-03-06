const async = require('async');
const Topic = require('../models/topic');
const Post = require('../models/post');

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

// DETAIL GET
exports.topic_detail = (req, res, next) => {
  async.parallel({
    topic(callback) {
      Topic.findById(req.params.id)
        .exec(callback);
    },
    topics_posts(callback) {
      Post.find({ topics: req.params.id })
        .exec(callback);
    },
  }, (err, results) => {
    if (err) { return next(err); } // Error in API usage.
    if (results.topic == null) { // No results.
      const error = new Error('Topic not found');
      error.status = 404;
      return next(error);
    }
    // Successful
    return res.send({ topic: results.topic, topic_posts: results.topics_posts });
  });
};

// CREATE POST.
exports.topic_create = (req, res, next) => {
  // Create a Topic object using request params
  const topic = new Topic(
    {
      name: req.body.name,
    },
  );
  topic.save((err, newTopic) => {
    if (err) { return next(err); }
    // Successful - send newly formed Id
    return res.send(newTopic);
  });
};

// DELETE POST.
exports.topic_delete = (req, res, next) => {
  async.series([
    // First delete posts under this topic
    (callback) => {
      Post.deleteMany({ topic: req.params.id }, callback);
    },
    // Then delete topic
    (callback) => {
      Topic.findByIdAndRemove(req.params.id, callback);
    },
  ], (err) => {
    if (err) { return next(err); }
    // Success - set OK status
    return res.status(200).end();
  });
};

// UPDATE POST.
exports.topic_update = (req, res, next) => {
  // Create a Topic object with data and old id
  const topic = new Topic(
    {
      name: req.body.name,
      _id: req.params.id,
    },
  );

  // Update the record
  Topic.findByIdAndUpdate(req.params.id, topic, {}, (err) => {
    if (err) { return next(err); }
    // Successful - set OK status
    return res.status(200).end();
  });
};
