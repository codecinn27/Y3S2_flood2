// Import your models
const { AyerKeroh, DurianTunggal } = require('../models/ver1'); // Import your models

// Controller function to save data to MongoDB
exports.saveMqttData = async (topic, message) => {
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

      // Generate current timestamp in Malaysia Time
      const malaysiaOffset = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
      const malaysiaTime = new Date(Date.now() + malaysiaOffset);

      const newData = new model({
        tempC: data.tempC,
        humidity: data.humidity,
        rain: data.rain,
        rainOutput: data.rain_output,
        distance: data.distance_cm, // This is required
        status: data.status,
        time: malaysiaTime, // Adjusted to Malaysia Time
      });

      // Save the data to MongoDB
      await newData.save();
      console.log(`Data saved to ${model.modelName}`);
    }
  } catch (err) {
    console.error('Error saving data to MongoDB:', err);
  }
};
