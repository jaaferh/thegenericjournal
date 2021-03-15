const express = require('express');

const router = express.Router();

// Require controller modules.
const postController = require('../controllers/postController');
const authorController = require('../controllers/authorController');
const topicController = require('../controllers/topicController');
const containerController = require('../controllers/containerController');
const contentController = require('../controllers/contentController');
const commentController = require('../controllers/commentController');

// GET catalog home page.
router.get('/', postController.index);

/// AUTHOR ROUTES ///

// POST request for creating Author.
router.post('/author/create', authorController.author_create);

// POST request to delete Author.
router.delete('/author/:id/delete', authorController.author_delete);

// POST request to update Author.
router.post('/author/:id/update', authorController.author_update);

// GET request for Author search.
router.get('/author/search/:key', authorController.author_search);

// GET request for one Author.
router.get('/author/:id', authorController.author_detail);

// GET request for list of all Authors.
router.get('/authors', authorController.author_list);

/// COMMENT ROUTES ///

// POST request for creating comment.
router.post('/comment/create', commentController.comment_create);

// POST request to delete comment.
router.delete('/comment/:id/delete', commentController.comment_delete);

// POST request to update comment.
router.post('/comment/:id/update', commentController.comment_update_post);

// GET request for one comment.
router.get('/comment/:id', commentController.comment_detail);

// GET request for list of all comment.
router.get('/comments', commentController.comment_list);

/// CONTAINER ROUTES ///

// POST request for creating container.
router.post('/container/create', containerController.container_create_post);

// POST request to delete container.
router.post('/container/:id/delete', containerController.container_delete_post);

// POST request to update container.
router.post('/container/:id/update', containerController.container_update_post);

// GET request for one container.
router.get('/container/:id', containerController.container_detail);

// GET request for list of all container.
router.get('/containers', containerController.container_list);

/// CONTENT ROUTES ///

// POST request for creating content.
router.post('/content/create', contentController.content_create_post);

// POST request to delete content.
router.post('/content/:id/delete', contentController.content_delete_post);

// POST request to update content.
router.post('/content/:id/update', contentController.content_update_post);

// GET request for one content.
router.get('/content/:id', contentController.content_detail);

// GET request for list of all content.
router.get('/contents', contentController.content_list);

/// POST (JOURNAL) ROUTES ///

// POST request for creating post.
router.post('/post/create', postController.post_create);

// POST request to delete post.
router.post('/post/:id/delete', postController.post_delete);

// POST request to update post.
router.post('/post/:id/update', postController.post_update);

// GET request for post search.
router.get('/post/search/:key', postController.post_search);

// GET request for one post.
router.get('/post/:id', postController.post_detail);

// GET request for list of all post.
router.get('/posts', postController.post_list);

/// TOPIC ROUTES ///

// POST request for creating topic.
router.post('/topic/create', topicController.topic_create);

// POST request to delete topic.
router.delete('/topic/:id/delete', topicController.topic_delete);

// POST request to update topic.
router.post('/topic/:id/update', topicController.topic_update);

// GET request for one topic.
router.get('/topic/:id', topicController.topic_detail);

// GET request for list of all topic.
router.get('/topics', topicController.topic_list);

module.exports = router;
