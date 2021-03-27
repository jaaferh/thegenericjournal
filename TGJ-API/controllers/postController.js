const Post = require('../models/post');
const Container = require('../models/container');

// HOMEPAGE GET
exports.index = (req, res) => {
  res.send('NOT IMPLEMENTED: Site Home Page');
};

// ALL POSTS GET
exports.post_list = (req, res, next) => {
  Post.find()
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
exports.post_create = (req, res) => {
  res.send('NOT IMPLEMENTED: post create POST');
};

// DELETE POST.
exports.post_delete = (req, res) => {
  res.send('NOT IMPLEMENTED: post delete POST');
};

// UPDATE POST.
exports.post_update = (req, res, next) => {
  console.log(req.body);
  console.log(req.body.content);
  // Create a Post object with data and old id.
  const post = new Post(
    {
      title: req.body.title,
      thumbnail: req.body.thumbnail,
      author: req.body.author,
      summary: req.body.summary,
      content: req.body.content,
      date_created: req.body.date_created,
      topics: req.body.topics,
      comments: req.body.comments,
      _id: req.params.id,
    },
  );

  // Update the record.
  Post.findByIdAndUpdate(req.params.id, post, {}, (err) => {
    if (err) { return next(err); }
    // Successful - set OK status
    return res.status(200).end();
  });
};
