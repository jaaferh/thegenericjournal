const { body } = require('express-validator');
const async = require('async');
const debug = require('debug')('author');
const Author = require('../models/author');
const Post = require('../models/post');
const hasAdminAccess = require('../helper/checkAdmin');

// ALL AUTHORS GET.
exports.author_list = (req, res, next) => {
  Author.find()
    .sort([['family_name', 'ascending']])
    .then((listAuthors) => {
      res.send(listAuthors);
    })
    .catch((err) => {
      debug(`author list error: ${err}`);
      next(err);
    }); // Example of using Promise .then().catch() instead of .exec((err,result))
};

// AUTHOR SEARCH GET
exports.author_search = (req, res, next) => {
  const inputName = new RegExp(req.params.key, 'i');

  Author.find({ $text: { $search: inputName } })
    .sort([['first_name', 'ascending']])
    .exec((err, fullsearch) => {
      if (err) {
        debug(`author full search error: ${err}`);
        return next(err);
      }
      // Successful
      if (!err && fullsearch.length) return res.send(fullsearch);
      if (!err && fullsearch.length === 0) {
        return Author.find({
          $or: [
            { first_name: inputName },
            { family_name: inputName },
          ],
        })
          .exec((error, partialsearch) => {
            if (error) {
              debug(`author partial search error: ${error}`);
              return next(error);
            }
            // Successful
            return res.send(partialsearch);
          });
      }
      return null;
    });
};

// // AUTHOR_POSTS GET
// exports.author_posts = (req, res, next) => {
//   Author.find()
//     .sort([['first_name', 'ascending']])
//     .exec((err, listAuthors) => {
//       if (err) { return next(err); }
//       // Successful
//       return Post.find()
//         .populate('author')
//         .exec((error, listPosts) => {
//           if (error) { return next(error); }
//           // Successful
//           return res.send({ authors: listAuthors, posts: listPosts });
//         });
//     });
// };

// AUTHOR_POSTS GET
exports.author_posts = async (req, res, next) => {
  const isAdmin = await hasAdminAccess(req);
  Author.find()
    .sort([['first_name', 'ascending']])
    .then((listAuthors) => Post.find({ admin: [false, null, isAdmin] })
      .populate('author')
      .then((listPosts) => res.send({ authors: listAuthors, posts: listPosts }))
      .catch((err) => {
        debug(`author_posts Post find error: ${err}`);
        next(err);
      }))
    .catch((err) => {
      debug(`author_posts Author find error: ${err}`);
      next(err);
    });
};

// DETAIL GET.
exports.author_detail = async (req, res, next) => {
  const isAdmin = await hasAdminAccess(req);

  async.parallel({
    author(callback) {
      Author.findById(req.params.id)
        .exec(callback);
    },
    authors_posts(callback) {
      Post.find({ author: req.params.id, admin: [false, null, isAdmin] })
        .populate('topics')
        .exec(callback);
    },
  }, (err, results) => {
    if (err) {
      debug(`author detail error: ${err}`);
      return next(err);
    } // Error in API usage.
    if (results.author == null) { // No results.
      const error = new Error('Author not found');
      error.status = 404;
      debug(`author detail author not found error: ${err}`);
      return next(error);
    }
    // Successful
    return res.send({ author: results.author, author_posts: results.authors_posts });
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
  author.save((err, newAuthor) => {
    if (err) {
      debug(`author create error: ${err}`);
      return next(err);
    }
    // Successful - set OK status
    return res.send(newAuthor);
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
    if (err) {
      debug(`author delete error: ${err}`);
      return next(err);
    }
    // Success - set OK status
    return res.status(200).end();
  });
};

// UPDATE POST.
exports.author_update = (req, res, next) => {
  // Create an Author object with data and old id.
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
    if (err) {
      debug(`author update error: ${err}`);
      return next(err);
    }
    // Successful - set OK status
    return res.status(200).end();
  });
};

// AUTHOR VALIDATION
exports.author_validate = [
  body('first_name').trim().isLength({ min: 1 }),
  body('family_name').trim().isLength({ min: 1 }),
  body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(), // checkFalsy: True means accept empty string or null as empty value
  body('bio').trim().optional({ checkFalsy: true }).isLength({ max: 255 }),
];
