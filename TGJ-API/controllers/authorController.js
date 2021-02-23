var Author = require('../models/author');
var Post = require('../models/post');

// ALL AUTHORS GET.
exports.author_list = function(req, res) {
    Author.find()
    .sort([['family_name', 'ascending']])
    .exec(function (err, list_authors) {
        if (err) { return next(err); }
        //Successful
        res.send(list_authors);
    });
};

// DETAIL GET.
exports.author_detail = function(req, res, next) {
    async.parallel({
        author: function(callback) {
            Author.findById(req.params.id)
            .exec(callback)
        },
        authors_posts: function(callback) {
            Post.find({ 'author': req.params.id })
            .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.author==null) { // No results.
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        // Successful
        res.send({ author: results.author, author_posts: results.authors_posts });
    });
};

// CREATE POST.
exports.author_create_post = function(req, res, next) {
    // Create an Author object using request params
    var author = new Author(
        {
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            bio: req.body.bio,
            date_joined: req.body.date_joined,
            pic_url: req.body.pic_url
        });
    author.save(function (err) {
        if (err) { return next(err); }
        // Successful - set OK status
        res.status(200).end();
    });
};

// DELETE POST.
exports.author_delete_post = function(req, res) {

    async.series([
        // First delete author's posts
        function(callback) {
            Post.deleteMany({ 'author': req.params.id }, callback);
        },
        // Then delete author
        function(callback) {
            Author.findByIdAndRemove(req.body.authorid, callback);
        }, 
    ], function (err, results) {
        if (err) { return next(err); }
        // Success - set OK status
        res.status(200).end();
    });
    

    
};

// UPDATE POST.
exports.author_update_post = function(req, res) {

    // Create a Author object with data and old id.
    var author = new Author(
        {
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            bio: req.body.bio,
            date_joined: req.body.date_joined,
            pic_url: req.body.pic_url,
            _id: req.params.id //This is required, or a new ID will be assigned!
        });

    // Update the record.
    Author.findByIdAndUpdate(req.params.id, author, {}, function (err,theauthor) {
        if (err) { return next(err); }
        // Successful - set OK status
        res.status(200).end();
    });
};
