require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const {connectDB} = require("./database/connection");

// Import the socket setup from controllers/socket.js
const { app, server, io } = require('./controllers/socket'); // Import from socket.js

// Set up the session, define before router
const sessionOptions = { secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false };
app.use(session(sessionOptions));

var indexRouter = require('./routes/iot');
var usersRouter = require('./routes/test');
var devRouter = require('./routes/iot_dev');

app.use('/', indexRouter);
app.use('/test', usersRouter);
app.use('/b022110115', devRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//to used ejs layout for boilerplate.ejs, use to import variable from controller to ejs
app.engine('ejs', ejsMate);

connectDB();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.error("Error occurred:", err.message);

  // Respond with a generic error message
  res.status(err.status || 500).json({ error: err.message });
});

const port = process.env.PORT || 3008;
//using server.listern instead of app.listen
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`🚀 Open the application in your browser: http://localhost:${port}`);
})

module.exports = {app, server};

