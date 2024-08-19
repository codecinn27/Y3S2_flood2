// socket.js
const socketIo = require('socket.io');
const mqttController = require('./mqttTest'); // Import your MQTT controller if needed

module.exports = (io) => {

  io.on('connection', (socket) => {
    console.log('New client connected');

    // Listen for the 'publish' event
    socket.on('publish', (data) => {
      console.log('Publishing message:', data);
      mqttController.publishMessage(data.topic, data.message);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  // Pass the `io` instance to the MQTT controller
  mqttController.setupIo(io);

  // You can return the io instance if you want to use it elsewhere
  return io;
};
