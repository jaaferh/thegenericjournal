const Comment = require('../models/comment');
const Post = require('../models/post');

// CREATE POST.
exports.comment_create = (req, res, next) => {
  // Create a Comment object using request params
  const comment = new Comment(
    {
      post: req.body.post,
      parent_comment: req.body.parent_comment,
      author_nickname: req.body.author_nickname,
      text: req.body.text,
      date_posted: req.body.date_posted,
      last_edited: req.body.last_edited,
      likes: req.body.likes,
      dislikes: req.body.dislikes,
    },
  );
  comment.save((err, newComment) => {
    if (err) { return next(err); }
    // Successful - Add to post and send newly formed Id
    Post.findByIdAndUpdate(
      req.body.post._id,
      { $push: { comments: newComment } },
      { safe: true, upsert: true, new: true },
      (error) => {
        if (error) { return next(error); }
        return null;
      },
    );

    return res.send(newComment);
  });
};

// DELETE POST.
exports.comment_delete = (req, res, next) => {
  Comment.findByIdAndRemove(req.params.id, (err) => {
    if (err) { return next(err); }
    // Success - set OK status
    return res.status(200).end();
  });
};

// UPDATE POST.
exports.comment_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: comment update POST');
};
