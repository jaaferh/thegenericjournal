#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require('async');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Comment = require('./models/comment');
const TextContainer = require('./models/txtcontainer');
const ImageContainer = require('./models/imgcontainer');
const Container = require('./models/container');
const Content = require('./models/content');
const Post = require('./models/post');
const Topic = require('./models/topic');
const express = require('express');

const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const authors = [];
const comments = [];
const containers = [];
const contents = [];
const posts = [];
const topics = [];

function authorCreate(first_name, family_name, d_birth, bio, d_joined, pic_url, cb) {
  const authordetail = { first_name, family_name };
  if (d_birth != false) authordetail.date_of_birth = d_birth;
  authordetail.bio = bio;
  if (d_joined != false) authordetail.date_joined = d_joined;
  authordetail.pic_url = pic_url;

  const author = new Author(authordetail);

  author.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Author: ${author}`);
    authors.push(author);
    cb(null, author);
  });
}

function topicCreate(name, cb) {
  const topic = new Topic({ name });

  topic.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Topic: ${topic}`);
    topics.push(topic);
    cb(null, topic);
  });
}

function postCreate(title, author, thumbnail, summary, containers, last_edited, d_created, topics, comments, cb) {
  const postdetail = {
    title,
    author,
    thumbnail,
    summary,
  };
  if (d_created != false) postdetail.date_created = d_created;
  if (topics != false) postdetail.topics = topics;
  if (comments != false) postdetail.comments = comments;
  // if (tiContainers != false) {
  //   postdetail.content = {};
  //   postdetail.content.containers = tiContainers;
  //   postdetail.content.last_edited = dEdited;
  // }
  postdetail.content = {};
  postdetail.content.containers = containers;
  postdetail.content.last_edited = last_edited;
  console.log(postdetail);
  const post = new Post(postdetail);

  post.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Post: ${post}`);
    posts.push(post);
    cb(null, post);
  });
}

function commentCreate(p_comment, author_nick, text, d_posted, last_edit, likes, dislikes, cb) {
  const commentdetail = {
    author_nickname: author_nick,
    text,
    likes,
    dislikes,
  };
  if (d_posted != false) commentdetail.date_posted = d_posted;
  if (last_edit != false) commentdetail.last_edited = last_edit;
  if (p_comment != false) commentdetail.parent_comment = p_comment;

  const comment = new Comment(commentdetail);
  comment.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Comment: ${comment}`);
    comments.push(comment);
    cb(null, comment);
  });
}

function contentCreate(container, last_edited, cb) {
  const contentDetail = {
    container,
    last_edited,
  };
  const content = new Content(contentDetail);
  // const model = db.model('test', Content);
  // model.create(contentDetail).then(() => {
  //   console.log(`New Content: ${content}`);
  //   contents.push(content);
  //   cb(null, content);
  // });
  content.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Content: ${content}`);
    contents.push(content);
    cb(null, content);
  });

  if (container !== false) contentDetail.container = container;
  contents.push(contentDetail);
  cb(null, contentDetail);
}

function textContainerCreate(type, text, cb) {
  const textcontainerdetail = {
    type,
    text,
  };

  const textcontainer = new TextContainer(textcontainerdetail);
  textcontainer.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New container: ${textcontainer}`);
    containers.push(textcontainer);
    cb(null, textcontainer);
  });
}

function imgContainerCreate(type, img_url, caption, cb) {
  const containerdetail = {
    type,
    image_url: img_url,
    caption,
  };

  const container = new ImageContainer(containerdetail);
  container.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New container: ${container}`);
    containers.push(container);
    cb(null, container);
  });
}

function containerCreate(type, text, image_url, caption, cb) {
  const containerDetail = {
    type,
    text,
    image_url,
    caption,
  };
  const container = new Container(containerDetail);
  container.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New container: ${container}`);
    containers.push(container);
    cb(null, container);
  });
}

function createTopicAuthors(cb) {
  async.series([
    function (callback) {
      authorCreate('Patrick', 'Rothfuss', '1973-06-06', 'i like this',
        '2021-02-21', 'https://res.cloudinary.com/soqudu/image/upload/v1596199359/punjouwntf7c7ld0nvsx.jpg', callback);
    },
    function (callback) {
      authorCreate('Mohammed', 'Ridha', '1988-06-06', 'i like cats',
        '2021-02-21', 'https://res.cloudinary.com/soqudu/image/upload/v1596316663/bkg5po7mbhvzwi7sm6qf.jpg', callback);
    },
    function (callback) {
      topicCreate('Tech', callback);
    },
    function (callback) {
      topicCreate('Science', callback);
    },
  ],
  // optional callback
  cb);
}

function createAuthorsOnly(cb) {
  async.series([
    function (callback) {
      authorCreate('Patrick', 'Rothfuss', '1973-06-06', 'i like this',
        '2021-02-21', 'https://res.cloudinary.com/soqudu/image/upload/v1596199359/punjouwntf7c7ld0nvsx.jpg', callback);
    },
    function (callback) {
      authorCreate('Mohammed', 'Ridha', '1988-06-06', 'i like cats',
        '2021-02-21', 'https://res.cloudinary.com/soqudu/image/upload/v1596316663/bkg5po7mbhvzwi7sm6qf.jpg', callback);
    },
  ], cb);
}

function createComments(cb) {
  async.series([
    function (callback) {
      commentCreate(null, 'dudemcdude', 'this is my comment', null,
        null, 1, 2, callback);
    },
    function (callback) {
      commentCreate(comments[0], 'dudette', 'this is my counter comment', null,
        null, 50, 2, callback);
    },
  ],
  // optional callback
  cb);
}

// function createContainers(cb) {
//   async.series([
//     function (callback) {
//       textContainerCreate('Text', 'this is my container text', callback);
//     },
//     function (callback) {
//       imgContainerCreate('Image', 'imgurl.com', 'this is a caption', callback);
//     },
//   ],
//   // optional callback
//   cb);
// }

function createContainers(cb) {
  async.series([
    function (callback) {
      containerCreate('Text', 'This is my container text', null, null, callback);
    },
    function (callback) {
      containerCreate('Image', null, 'image.com', 'caption', callback);
    },
  ], cb);
}

function createContents(cb) {
  async.series([
    function (callback) {
      contentCreate([{ type: 'Text', text: 'Test test' }], Date.now(), callback);
    },
    function (callback) {
      contentCreate([{ type: 'Text', text: 'Test test' }, { type: 'Image', img_url: 'test.com', caption: 'Caption test' }], null, callback);
    },
  ],
  // optional callback
  cb);
}

function createPosts(cb) {
  async.series([
    function (callback) {
      postCreate('my post', authors[0], 'thumbnail.url', 'my summary',
        [containers[0]], Date.now(), null, [topics[0], topics[1]], 
        [comments[0]], callback);
    },
    function (callback) {
      postCreate('my post 2', authors[1], 'thumbnail2.url', 'my summary 2',
        [containers[0], containers[1]], null, null, [topics[0], 
        topics[1]], [comments[0], comments[1]],
        callback);
    },
    // function (callback) {
    //   postCreate('my post',authors[0], 'thumbnail.urk', 'mysummary', [containers[0]], Date.now, Date.now(),
    //   [topics[0]], [comments[0]], callback);
    // },
  ],
  // optional callback
  cb);
}

async.series([
  createTopicAuthors,
  createComments,
  createContainers,
  // createContents,
  createPosts,
  // createAuthorsOnly,
],
// Optional callback
(err, results) => {
  if (err) {
    console.log(`FINAL ERR: ${err}`);
  } else {
    console.log(`POSTS: ${posts}`);
  }
  // All done, disconnect from database
  mongoose.connection.close();
});
