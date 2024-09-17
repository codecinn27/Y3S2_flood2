// npm run dev
// npm run start

//$env:MONGO_URL="mongodb+srv://codecinnpro:LWmU9e7EKGwQy1P6@cluster0.z8rexks.mongodb.net/idp_iot?retryWrites=true&w=majority&appName=Cluster0"
//node app.js
//npm install axios
//npm install express-session

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
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // Define a default error message if not provided
//   const errorMessage = err.message || "oops! Page not found";

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error2', { errorMessage });
// });

app.use((err, req, res, next) => {
  console.error("Error occurred:", err.message);

  // Respond with a generic error message
  res.status(err.status || 500).json({ error: err.message });
});

const port = process.env.PORT || 3008;
//using server.listern instead of app.listen
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = {app, server};

