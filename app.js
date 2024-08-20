require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const ejsMate = require('ejs-mate');

//mqtt socket io
const mqtt = require('mqtt');
const socketIo = require('socket.io');
const http = require('http');

var indexRouter = require('./routes/iot');
var usersRouter = require('./routes/test');

var app = express();

//mqtt and socket io
const server = http.createServer(app);
const io = socketIo(server); // Initialize socket.io with the server

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//to used ejs layout for boilerplate.ejs, use to import variable from controller to ejs
app.engine('ejs', ejsMate);

// MQTT client configuration
const mqttClient = mqtt.connect(process.env.BROKER_URL, {
  username: process.env.BROKER_USERNAME1,
  password: process.env.BROKER_PASS1
});

mqttClient.on('connect', () => {
    console.log('MQTT connected');
    mqttClient.subscribe(process.env.TEST_TOPIC, (err) => {
      if (err) {
        console.error('Failed to subscribe:', err);
      } else {
        console.log(`Subscribed to topic ${process.env.TEST_TOPIC}`);
      }
    });
  });

mqttClient.on('message', (topic, message) => {
  io.emit('mqtt-message', { topic, message: message.toString() });
});

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

// Handle socket connections
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('publish', (data) => {
    mqttClient.publish(data.topic, data.message);
  });

  // Handle subscribe event
  socket.on('subscribe', (topic) => {
    mqttClient.subscribe(topic, (err) => {
      if (err) {
        console.error(`Failed to subscribe to topic ${topic}:`, err);
      } else {
        console.log(`Subscribed to topic ${topic}`);
      }
    });
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

module.exports = {app, server};

