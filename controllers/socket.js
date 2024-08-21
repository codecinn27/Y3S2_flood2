const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const mqtt = require("mqtt");

const app = express();

const server = http.createServer(app);
const io = new Server(server);

// MQTT client setup
const mqttClient = mqtt.connect(process.env.BROKER_URL, {
    username: process.env.BROKER_USERNAME1,
    password: process.env.BROKER_PASS1,
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

// Handle incoming MQTT messages and broadcast to connected socket.io clients
mqttClient.on('message', (topic, message) => {
    io.emit('mqtt-message', { topic, message: message.toString() });
  });
    
// Handle socket.io connections
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
  
    socket.on('publish', (data) => {
      mqttClient.publish(data.topic, data.message);
    });
  
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
      console.log('Client disconnected:', socket.id);
    });
  });
  

module.exports = {app, server, io};