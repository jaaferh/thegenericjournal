const { body } = require('express-validator');
const async = require('async');
const Post = require('../models/post');
const Container = require('../models/container');
const Comment = require('../models/comment');

// ALL POSTS GET
exports.post_list = (req, res, next) => {
  Post.find()
    .limit(Number(req.params.limit))
    .populate('author')
    .populate('topics')
    .sort([['date_created', 'descending'], ['title', 'ascending']])
    .exec((err, listPosts) => {
      if (err) { return next(err); }
      // Successful
      return res.send(listPosts);
    });
};

// POST SEARCH GET
exports.post_search = (req, res, next) => {
  const inputTitle = new RegExp(req.params.key, 'i');

  Post.find({ $text: { $search: inputTitle } })
    .exec((err, fullsearch) => {
      if (err) { return next(err); }
      // Successful
      if (!err && fullsearch.length) return res.send(fullsearch);
      if (!err && fullsearch.length === 0) {
        return Post.find({
          $or: [
            { title: inputTitle },
            { summary: inputTitle },
          ],
        })
          .exec((error, partialsearch) => {
            if (error) { return next(error); }
            // Successful
            return res.send(partialsearch);
          });
      }
      return null;
    });
};

// POST DETAIL GET
exports.post_detail = (req, res, next) => {
  Post.findById(req.params.id)
    .populate('author')
    .populate('topics')
    .populate({
      path: 'content.containers',
      model: 'Container',
    })
    .populate({
      path: 'comments',
      populate: {
        path: 'parent_comment',
      },
    })
    .exec((err, postDetail) => {
      if (err) { return next(err); }
      // Successful
      return res.send(postDetail);
    });
};

// CREATE POST.
exports.post_create = (req, res, next) => {
  async.waterfall([
    // Create Post first
    (callback) => {
      const post = new Post(
        {
          title: req.body.post.title,
          thumbnail: req.body.post.thumbnail,
          author: req.body.post.author,
          summary: req.body.post.summary,
          content: { containers: [], last_edited: req.body.post.content.last_edited },
          date_created: req.body.post.date_created,
          topics: req.body.post.topics,
          comments: req.body.post.comments,
        },
      );
      post.save((err, newPost) => {
        if (err) { return next(err); }

        return callback(null, newPost);
      });
    },
    // Create Containers using post.content.containers (All should be additions)
    (newPost, callback) => {
      const addContlist = [];
      req.body.post.content.containers.forEach((cont) => {
        const container = new Container(
          {
            post: newPost,
            type: cont.type,
            title: cont.title,
            text: cont.text,
            image_url: cont.image_url,
            caption: cont.caption,
          },
        );
        addContlist.push(container);
      });
      Container.insertMany(addContlist, (err) => {
        if (err) { return next(err); }
        return null;
      });
      callback(null, newPost, addContlist);
    },
    // Update the Post object with the newly created containers
    (newPost, addContList, callback) => {
      req.body.post.content.containers = addContList.map((c) => c._id);
      const post = new Post(
        {
          title: newPost.title,
          thumbnail: newPost.thumbnail,
          author: newPost.author,
          summary: newPost.summary,
          content: req.body.post.content,
          date_created: newPost.date_created,
          topics: newPost.topics,
          comments: newPost.comments,
          _id: newPost._id,
        },
      );
      // Update the post object
      Post.findByIdAndUpdate(newPost._id, post, {}, (err, updatedPost) => {
        if (err) { return next(err); }
        // Successful - set OK status
        return callback(null, updatedPost);
      });
    },
  ], (err, result) => {
    if (err) { return next(err); }
    // Success - set Ok status
    return res.send(result);
  });
};

// DELETE POST.
exports.post_delete = (req, res, next) => {
  async.series([
    // Delete Post Containers
    (callback) => {
      Container.deleteMany({ post: req.params.id }, callback);
    },
    // Delete Post Comments
    (callback) => {
      Comment.deleteMany({ post: req.params.id }, callback);
    },
    // Now delete Post
    (callback) => {
      Post.findByIdAndRemove(req.params.id, callback);
    },
  ], (err) => {
    if (err) { return next(err); }
    // Success - set OK status
    return res.status(200).end();
  });
};

// UPDATE POST.
exports.post_update = (req, res, next) => {
  async.waterfall([
    // Add Containers
    (callback) => {
      // Get all containers
      const postContainers = req.body.post.content.containers;

      // Add all new created container documents to addContlist
      const addContlist = [];
      postContainers.forEach((cont, index) => {
        if (cont._id === undefined) {
          // Set tempId to track which ones were added
          req.body.post.content.containers[index].tempId = addContlist.length;
          const container = new Container(
            {
              post: cont.post,
              type: cont.type,
              title: cont.title,
              text: cont.text,
              image_url: cont.image_url,
              caption: cont.caption,
            },
          );

          addContlist.push(container);
        }
      });

      // Bulk Update
      Container.insertMany(addContlist, (err) => {
        if (err) { return next(err); }
        return null;
      });
      callback(null, addContlist);
    },
    // Update existing Containers
    (addList, callback) => {
      // Replace tempIds with _ids
      addList.forEach((cont, index) => {
        req.body.post.content.containers.forEach((reqC, reqI) => {
          if (reqC.tempId === index) {
            req.body.post.content.containers.splice(reqI, 1, cont);
          }
        });
      });

      // First get the existing containers
      const editContainers = req.body.post.content.containers.filter((c) => c._id !== undefined);
      if (!editContainers) {
        return callback(null, null);
      }

      editContainers.forEach((cont) => {
        const container = new Container(
          {
            post: cont.post,
            type: cont.type,
            title: cont.title,
            text: cont.text,
            image_url: cont.image_url,
            caption: cont.caption,
            _id: cont._id,
          },
        );

        // Update the record
        Container.findByIdAndUpdate(cont._id, container, {}, (err) => {
          if (err) { return next(err); }
          // Successful - set OK status
          return null;
        });
      });
      return callback(null);
    },
    // Delete Containers in delContainers array
    (callback) => {
      const { delContainers } = req.body;
      if (!delContainers) {
        return callback(null);
      }

      delContainers.forEach((cont) => {
        Container.findByIdAndRemove(cont._id, (err) => {
          if (err) { return next(err); }
          // Success - set OK status
          return null;
        });
      });

      return callback(null);
    },
    // Update the post
    (callback) => {
      // Create a Post object with data and old id.
      const post = new Post(
        {
          title: req.body.post.title,
          thumbnail: req.body.post.thumbnail,
          author: req.body.post.author,
          summary: req.body.post.summary,
          content: req.body.post.content,
          date_created: req.body.post.date_created,
          topics: req.body.post.topics,
          comments: req.body.post.comments,
          _id: req.params.id,
        },
      );

      // Update the record.
      Post.findByIdAndUpdate(req.params.id, post, {}, (err) => {
        if (err) { return next(err); }
        // Successful - set OK status
        return callback(null);
      });
    },
  ], (err) => {
    if (err) { return next(err); }
    return res.status(200).end();
  });
};

// POST VALIDATION
exports.post_validate = [
  body('title').trim().isLength({ min: 1 }),
  body('summary').trim().isLength({ min: 1, max: 500 }),
];
