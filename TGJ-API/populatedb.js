#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Author = require('./models/author')
var Comment = require('./models/comment')
var TextContainer = require('./models/txtcontainer')
var ImageContainer = require('./models/imgcontainer')
var Content = require('./models/content')
var Post = require('./models/post')
var Topic = require('./models/topic')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var authors = []
var comments = []
var containers = []
var contents = []
var posts = []
var topics = []

function authorCreate(first_name, family_name, d_birth, bio, d_joined, pic_url, cb) {
  authordetail = {first_name:first_name , family_name: family_name }
  if (d_birth != false) authordetail.date_of_birth = d_birth
  authordetail.bio = bio;
  if (d_joined != false) authordetail.date_joined = d_joined
  authordetail.pic_url = pic_url;

  var author = new Author(authordetail);
       
  author.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Author: ' + author);
    authors.push(author)
    cb(null, author)
  }  );
}

function topicCreate(name, cb) {
  var topic = new Topic({ name: name });
       
  topic.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Topic: ' + topic);
    topics.push(topic)
    cb(null, topic);
  }   );
}

function postCreate(title, author, thumbnail, summary, content, d_created, topics, comments, cb) {
    postdetail = {
        title: title,
        author: author,
        thumbnail: thumbnail,
        summary: summary,
        content: content
    }
    if (d_created != false) postdetail.date_created = d_created
    if (topics != false) postdetail.topics = topics
    if (comments != false) postdetail.comments = comments
      
    var post = new Post(postdetail);    
    post.save(function (err) {
      if (err) {
        cb(err, null)
        return
      }
      console.log('New Post: ' + post);
      posts.push(post)
      cb(null, post)
    }  );
}
  
function commentCreate(p_comment, author_nick, text, d_posted, last_edit, likes, dislikes, cb) {
    commentdetail = {
        author_nickname: author_nick,
        text: text,
        likes: likes,
        dislikes: dislikes
    }
    if (d_posted != false) commentdetail.date_posted = d_posted
    if (last_edit != false) commentdetail.last_edited = last_edit
    if (p_comment != false) commentdetail.parent_comment = p_comment
      
    var comment = new Comment(commentdetail);    
    comment.save(function (err) {
      if (err) {
        cb(err, null)
        return
      }
      console.log('New Comment: ' + comment);
      comments.push(comment)
      cb(null, comment)
    }  );
}

function contentCreate(container, last_edit, cb) {
    contentdetail = {
        last_edited: last_edit
    }

    if (container != false) contentdetail.container = container
      
    var content = new Content(contentdetail);    
    content.save(function (err) {
      if (err) {
        cb(err, null)
        return
      }
      console.log('New Content: ' + content);
      contents.push(content)
      cb(null, content)
    }  );
}

function textContainerCreate(type, text, cb) {
    textcontainerdetail = {
        type: type,
        text: text
    }
      
    var textcontainer = new TextContainer(textcontainerdetail);    
    textcontainer.save(function (err) {
      if (err) {
        cb(err, null)
        return
      }
      console.log('New container: ' + textcontainer);
      containers.push(textcontainer)
      cb(null, textcontainer)
    }  );
}

function imgContainerCreate(type, img_url, caption, cb) {
    containerdetail = {
        type: type,
        image_url: img_url,
        caption: caption
    }
      
    var container = new ImageContainer(containerdetail);    
    container.save(function (err) {
      if (err) {
        cb(err, null)
        return
      }
      console.log('New container: ' + container);
      containers.push(container)
      cb(null, container)
    }  );
}


function createTopicAuthors(cb) {
    async.series([
        function(callback) {
          authorCreate('Patrick', 'Rothfuss', '1973-06-06', 'i like this', 
            '2021-02-21', 'https://res.cloudinary.com/soqudu/image/upload/v1596199359/punjouwntf7c7ld0nvsx.jpg', callback);
        },
        function(callback) {
            authorCreate('Mohammed', 'Ridha', '1988-06-06', 'i like cats', 
            '2021-02-21', 'https://res.cloudinary.com/soqudu/image/upload/v1596316663/bkg5po7mbhvzwi7sm6qf.jpg', callback);
        },
        function(callback) {
          topicCreate("Tech", callback);
        },
        function(callback) {
          topicCreate("Science", callback);
        },
        ],
        // optional callback
        cb);
}

function createAuthorsOnly(cb) {
    async.series([
        function(callback) {
            authorCreate('Patrick', 'Rothfuss', '1973-06-06', 'i like this', 
              '2021-02-21', 'https://res.cloudinary.com/soqudu/image/upload/v1596199359/punjouwntf7c7ld0nvsx.jpg', callback);
          },
          function(callback) {
              authorCreate('Mohammed', 'Ridha', '1988-06-06', 'i like cats', 
              '2021-02-21', 'https://res.cloudinary.com/soqudu/image/upload/v1596316663/bkg5po7mbhvzwi7sm6qf.jpg', callback);
          },
    ], cb)
}


function createComments(cb) {
    async.series([
        function(callback) {
          commentCreate(null, 'dudemcdude', 'this is my comment', null, 
            null, 1, 2, callback);
        },
        function(callback) {
            commentCreate(comments[0], 'dudette', 'this is my counter comment', null, 
            null, 50, 2, callback);
        },
        ],
        // optional callback
        cb);
}

function createContainers(cb) {
    async.series([
        function(callback) {
            textContainerCreate('Text', 'this is my container text', callback);
        },
        function(callback) {
            imgContainerCreate('Image', 'imgurl.com', 'this is a caption', callback);
        },
        ],
        // optional callback
        cb);
}

function createContents(cb) {
    async.series([
        function(callback) {
            contentCreate([containers[0]], '2021-02-21', callback);
        },
        function(callback) {
            contentCreate([containers[0], containers[1]], '2021-02-20', callback);        
        },
        ],
        // optional callback
        cb);
}

function createPosts(cb) {
    async.series([
        function(callback) {
            postCreate('my post', authors[0], 'thumbnail.url', 'my summary', 
                contents[0], null, [topics[0], topics[1]], [comments[0]], callback);
        },
        function(callback) {
            postCreate('my post 2', authors[1], 'thumbnail2.url', 'my summary 2', 
                contents[1], null, [topics[0], topics[1]], [comments[0], comments[1]], callback);
        }
        ],
        // optional callback
        cb);
}



async.series([
    // createTopicAuthors,
    // createComments,
    // createContainers,
    // createContents,
    // createPosts
    createAuthorsOnly
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('POSTS: '+posts);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




