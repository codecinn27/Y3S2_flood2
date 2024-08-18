require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const ejsMate = require('ejs-mate');



var indexRouter = require('./routes/iot');
var usersRouter = require('./routes/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//to used ejs layout for boilerplate.ejs, use to import variable from controller to ejs
app.engine('ejs', ejsMate)

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

//WebSocket setup, The Socket.IO setup should be done after initializing the Express app.
const http = require('http');
const server = http.createServer(app);
// Import the Socket.IO setup
require('./controllers/socketTest')(server); // Pass the server to the socket setup

const port =  3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



module.exports = app;

