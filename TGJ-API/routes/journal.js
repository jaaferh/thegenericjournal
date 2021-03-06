var express = require('express');
var router = express.Router();

// Require controller modules.
var post_controller = require('../controllers/postController');
var author_controller = require('../controllers/authorController');
var topic_controller = require('../controllers/topicController');
var container_controller = require('../controllers/containerController');
var content_controller = require('../controllers/contentController');
var comment_controller = require('../controllers/commentController');


// GET catalog home page.
router.get('/', post_controller.index);


/// AUTHOR ROUTES ///

// POST request for creating Author.
router.post('/author/create', author_controller.author_create);

// POST request to delete Author.
router.delete('/author/:id/delete', author_controller.author_delete);

// POST request to update Author.
router.post('/author/:id/update', author_controller.author_update);

// GET request for Author search.
router.get('/author/search/:key', author_controller.author_search);

// GET request for one Author.
router.get('/author/:id', author_controller.author_detail);

// GET request for list of all Authors.
router.get('/authors', author_controller.author_list);


/// COMMENT ROUTES ///

// POST request for creating comment.
router.post('/comment/create', comment_controller.comment_create_post);

// POST request to delete comment.
router.post('/comment/:id/delete', comment_controller.comment_delete_post);

// POST request to update comment.
router.post('/comment/:id/update', comment_controller.comment_update_post);

// GET request for one comment.
router.get('/comment/:id', comment_controller.comment_detail);

// GET request for list of all comment.
router.get('/comments', comment_controller.comment_list);


/// CONTAINER ROUTES ///

// POST request for creating container.
router.post('/container/create', container_controller.container_create_post);

// POST request to delete container.
router.post('/container/:id/delete', container_controller.container_delete_post);

// POST request to update container.
router.post('/container/:id/update', container_controller.container_update_post);

// GET request for one container.
router.get('/container/:id', container_controller.container_detail);

// GET request for list of all container.
router.get('/containers', container_controller.container_list);


/// CONTENT ROUTES ///

// POST request for creating content.
router.post('/content/create', content_controller.content_create_post);

// POST request to delete content.
router.post('/content/:id/delete', content_controller.content_delete_post);

// POST request to update content.
router.post('/content/:id/update', content_controller.content_update_post);

// GET request for one content.
router.get('/content/:id', content_controller.content_detail);

// GET request for list of all content.
router.get('/contents', content_controller.content_list);


/// POST (JOURNAL) ROUTES ///

// POST request for creating post.
router.post('/post/create', post_controller.post_create_post);

// POST request to delete post.
router.post('/post/:id/delete', post_controller.post_delete_post);

// POST request to update post.
router.post('/post/:id/update', post_controller.post_update_post);

// GET request for one post.
router.get('/post/:id', post_controller.post_detail);

// GET request for list of all post.
router.get('/posts', post_controller.post_list);


/// TOPIC ROUTES ///

// POST request for creating topic.
router.post('/topic/create', topic_controller.topic_create_post);

// POST request to delete topic.
router.post('/topic/:id/delete', topic_controller.topic_delete_post);

// POST request to update topic.
router.post('/topic/:id/update', topic_controller.topic_update_post);

// GET request for one topic.
router.get('/topic/:id', topic_controller.topic_detail);

// GET request for list of all topic.
router.get('/topics', topic_controller.topic_list);

module.exports = router;
