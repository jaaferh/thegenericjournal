const async = require('async');
const Author = require('../models/author');
const Post = require('../models/post');

// ALL AUTHORS GET.
exports.author_list = (req, res, next) => {
  Author.find()
    .sort([['family_name', 'ascending']])
    .exec((err, listAuthors) => {
      if (err) { return next(err); }
      // Successful
      return res.send(listAuthors);
    });
};

// AUTHOR SEARCH GET
exports.author_search = (req, res, next) => {
  const inpuName = new RegExp(req.params.key, 'i');
  console.log(inpuName);

  Author.find({ $text: { $search: inpuName } })
    .exec((err, fullsearch) => {
      if (err) { return next(err); }
      // Successful
      if (!err && fullsearch.length) return res.send(fullsearch);
      if (!err && fullsearch.length === 0) {
        return Author.find({
          $or: [
            { first_name: inpuName },
            { family_name: inpuName },
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

// DETAIL GET.
exports.author_detail = (req, res, next) => {
  async.parallel({
    author(callback) {
      Author.findById(req.params.id)
        .exec(callback);
    },
    authors_posts(callback) {
      Post.find({ author: req.params.id })
        .populate('topics')
        .exec(callback);
    },
  }, (err, results) => {
    if (err) { return next(err); } // Error in API usage.
    if (results.author == null) { // No results.
      const error = new Error('Author not found');
      error.status = 404;
      return next(error);
    }
    // Successful
    return res.send({ title: 'Author Detail', author: results.author, author_posts: results.authors_posts });
  });
};

// CREATE POST.
exports.author_create = (req, res, next) => {
  // Create an Author object using request params
  const author = new Author(
    {
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      bio: req.body.bio,
      date_joined: req.body.date_joined,
      pic_url: req.body.pic_url,
    },
  );
  author.save((err) => {
    if (err) { return next(err); }
    // Successful - set OK status
    return res.status(200).end();
  });
};

// DELETE POST.
exports.author_delete = (req, res, next) => {
  async.series([
    // First delete author's posts
    (callback) => {
      Post.deleteMany({ author: req.params.id }, callback);
    },
    // Then delete author
    (callback) => {
      Author.findByIdAndRemove(req.params.id, callback);
    },
  ], (err) => {
    if (err) { return next(err); }
    // Success - set OK status
    return res.status(200).end();
  });
};

// UPDATE POST.
exports.author_update = (req, res, next) => {
  // Create a Author object with data and old id.
  const author = new Author(
    {
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      bio: req.body.bio,
      date_joined: req.body.date_joined,
      pic_url: req.body.pic_url,
      _id: req.params.id,
    },
  );

  // Update the record.
  Author.findByIdAndUpdate(req.params.id, author, {}, (err) => {
    if (err) { return next(err); }
    // Successful - set OK status
    return res.status(200).end();
  });
};
