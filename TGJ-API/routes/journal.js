const express = require('express');

const router = express.Router();
const expressJwt = require('express-jwt');

// Require controller modules.
const postController = require('../controllers/postController');
const authorController = require('../controllers/authorController');
const topicController = require('../controllers/topicController');
const containerController = require('../controllers/containerController');
const commentController = require('../controllers/commentController');
const cloudinaryController = require('../controllers/cloudinaryController');
const userController = require('../controllers/userController');

const checkAuth = expressJwt({
  secret: 'secret',
  algorithms: ['HS256'],
});

/// USER ROUTES ///

// POST request for creating User.
router.post('/user/register', userController.register_user);

// // POST request for logging in User.
router.post('/user/login', userController.login_user);

/// AUTHOR ROUTES ///

// POST request for creating Author.
router.post('/author/create', checkAuth, authorController.author_validate, authorController.author_create);

// POST request to delete Author.
router.delete('/author/:id/delete', checkAuth, authorController.author_delete);

// POST request to update Author.
router.post('/author/:id/update', checkAuth, authorController.author_validate, authorController.author_update);

// GET request for Author search.
router.get('/author/search/:key', authorController.author_search);

// GET request for one Author.
router.get('/author/:id', authorController.author_detail);

// GET request for list of all Authors.
router.get('/authors', authorController.author_list);

// GET request for list of all Authors and All Posts.
router.get('/authors/posts', authorController.author_posts);

/// COMMENT ROUTES ///

// POST request for creating comment.
router.post('/comment/create', checkAuth, commentController.comment_create);

// POST request to delete comment.
router.delete('/comment/:id/delete', checkAuth, commentController.comment_delete);

// POST request to update comment.
router.post('/comment/:id/update', checkAuth, commentController.comment_update_post);

// POST request to like comment.
router.post('/comment/:id/like', commentController.comment_like);

// POST request to dislike comment.
router.post('/comment/:id/dislike', commentController.comment_dislike);

/// CONTAINER ROUTES ///

// POST request for creating container.
router.post('/container/create', checkAuth, containerController.container_validate, containerController.container_create);

// POST request to delete container.
router.delete('/container/:id/delete', checkAuth, containerController.container_delete);

// POST request to update container.
router.post('/container/:id/update', checkAuth, containerController.container_validate, containerController.container_update);

/// POST (JOURNAL) ROUTES ///

// POST request for creating post.
router.post('/post/create', checkAuth, postController.post_validate, postController.post_create);

// POST request to delete post.
router.delete('/post/:id/delete', checkAuth, postController.post_delete);

// POST request to update post.
router.post('/post/:id/update', checkAuth, postController.post_validate, postController.post_update);

// GET request for post search.
router.get('/post/search/:key', postController.post_search);

// GET request for one post.
router.get('/post/:id', postController.post_detail);

// GET request for list of all post.
router.get('/posts/:limit', postController.post_list);

/// TOPIC ROUTES ///

// POST request for creating topic.
router.post('/topic/create', checkAuth, topicController.topic_validate, topicController.topic_create);

// POST request to delete topic.
router.delete('/topic/:id/delete', checkAuth, topicController.topic_delete);

// POST request to update topic.
router.post('/topic/:id/update', checkAuth, topicController.topic_validate, topicController.topic_update);

// GET request for one topic.
router.get('/topic/:id', topicController.topic_detail);

// GET request for list of all topic.
router.get('/topics', topicController.topic_list);

// GET request for list of all Topics and All Posts.
router.get('/topics/posts', topicController.topic_posts);

/// CLOUDINARY ROUTES ///

// POST request to upload photo.
router.post('/cloudinary/upload', checkAuth, cloudinaryController.photo_upload);

module.exports = router;
