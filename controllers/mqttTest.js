// controllers/mqttController.js
const mqtt = require('mqtt');
let io; // Declare the io instance globally

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
      console.log('Subscribed to topic ', process.env.TEST_TOPIC);
    }
  });
});

mqttClient.on('message', (topic, message) => {
  // Broadcast the message to all connected Socket.IO clients
  if (io) {
    io.emit('mqtt-message', { topic, message: message.toString() });
  }
});

// Function to setup the io instance
exports.setupIo = (socketIo) => {
  io = socketIo;
};

exports.publishMessage = (topic, message) => {
  mqttClient.publish(topic, message);
};

// Subscribe to a new topic
exports.subscribeTopic = (topic) => {
  mqttClient.subscribe(topic, (err) => {
    if (err) {
      console.error(`Failed to subscribe to topic ${topic}:`, err);
    } else {
      console.log(`Subscribed to topic: ${topic}`);
    }
  });
};