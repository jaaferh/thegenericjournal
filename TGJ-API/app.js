const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const debug = require('debug')('app');
const compression = require('compression');
const helmet = require('helmet');
require('dotenv').config();

const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const journalRouter = require('./routes/journal');

const app = express();

app.use(helmet()); // Protects against multiple vulnerabilities

// set up mongoose connection
const devDBUrl = 'mongodb+srv://dbUser:dbUserPassword@cluster0.1lj3d.mongodb.net/generic_journal?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || devDBUrl;
mongoose.connect(mongoDB, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', debug.bind(console, 'MongoDB connection error:'));

// set up Cross Origin Requests
const whitelist = [
  'https://localhost:4200', 
  'http://localhost:5001', 
  'https://res.cloudinary.com'
];

app.use(cors({
  origin(origin, callback) {
    // allow requests with no origin
    if (!origin) return callback(null, true);
    if (whitelist.indexOf(origin) === -1) {
      const message = 'The CORS policy for this origin doesn\'t '
                + `allow access from the particular origin: ${origin}`;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  },
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression()); // Compress all routes for faster HTTP response times
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/journal', journalRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
