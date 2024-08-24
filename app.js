// npm run dev
// npm run start
require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const ejsMate = require('ejs-mate');
const {connectDB} = require("./database/connection");

// Import the socket setup from controllers/socket.js
const { app, server, io } = require('./controllers/socket'); // Import from socket.js

var indexRouter = require('./routes/iot');
var usersRouter = require('./routes/test');

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

app.use('/', indexRouter);
app.use('/test', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 3000;
//using server.listern instead of app.listen
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = {app, server};

