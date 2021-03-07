const { everySeries } = require('async');
const Post = require('../models/post');

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
      return everySeries.send(listPosts);
    });
};

// POST SEARCH GET
exports.post_search = (req, res, next) => {
  const inputTitle = new RegExp(req.params.key, 'i');
  console.log(inputTitle);

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
exports.post_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: post detail: ${req.params.id}`);
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
exports.post_update = (req, res) => {
  res.send('NOT IMPLEMENTED: post update POST');
};
