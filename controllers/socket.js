const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const mqtt = require("mqtt");
const mongoose = require("mongoose");
const { AyerKeroh, DurianTunggal } = require('../models/ver1'); // Import your models

const app = express();

const server = http.createServer(app);
const io = new Server(server);
const topic = `${process.env.TEST_TOPIC}#`;
// MQTT client setup
const mqttClient = mqtt.connect(process.env.BROKER_URL, {
    username: process.env.BROKER_USERNAME1,
    password: process.env.BROKER_PASS1,
});

mqttClient.on('connect', () => {
    console.log('MQTT connected');
    mqttClient.subscribe(topic, (err) => {
      if (err) {
        console.error('Failed to subscribe:', err);
      } else {
        console.log(`Subscribed to topic ${process.env.TEST_TOPIC}`);
      }
    });
});

// Handle incoming MQTT messages and broadcast to connected socket.io clients
mqttClient.on('message', async (topic, message) => {
  io.emit('mqtt-message', { topic, message: message.toString() });
    // Save the data to the appropriate MongoDB collection
  try {
    let model;

    // Determine which model to use based on the topic
    if (topic.toLowerCase().includes('ayerkeroh')) {
      model = AyerKeroh;
    } else if (topic.toLowerCase().includes('duriantunggal')) {
        model = DurianTunggal;
    }

    if (model) {
        // Parse the incoming message (assuming it's JSON format)
        const data = JSON.parse(message.toString());
        const newData = new model({
            tempC: data.tempC,
            humidity: data.humidity,
            rain: data.rain,
            rainOutput: data.rain_output,
            distance: data.distance_cm, // This is required
            status: data.status,
            time: data.time,
            date: data.date,
        });

        await newData.save(); // Save the data to MongoDB
        console.log(`Data saved to ${model.modelName}`);
    }
  } catch (err) {
      console.error('Error saving data to MongoDB:', err);
  }
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