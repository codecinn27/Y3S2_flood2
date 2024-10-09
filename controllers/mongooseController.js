// Import your models
const { AyerKeroh, DurianTunggal } = require('../models/ver1'); // Import your models

// Controller function to save data to MongoDB
// const saveMqttData = async (topic, message) => {
//   try {
//     let model;

//     // Determine which model to use based on the topic
//     if (topic.toLowerCase().includes('ayerkeroh')) {
//       model = AyerKeroh;
//     } else if (topic.toLowerCase().includes('duriantunggal')) {
//       model = DurianTunggal;
//     }

//     if (model) {
//       // Parse the incoming message (assuming it's JSON format)
//       const data = JSON.parse(message.toString());

//       // Generate current timestamp in Malaysia Time
//       const malaysiaOffset = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
//       const malaysiaTime = new Date(Date.now() + malaysiaOffset);

//       const newData = new model({
//         tempC: data.tempC,
//         humidity: data.humidity,
//         rain: data.rain,
//         rainOutput: data.rain_output,
//         distance: data.distance_cm, // This is required
//         status: data.status,
//         date: data.date,
//         time: data.time,
//         mongoDBtime: malaysiaTime, // Adjusted to Malaysia Time
//       });

//       // Save the data to MongoDB
//       await newData.save();
//       console.log(`Data saved to ${model.modelName}`);
//     }
//   } catch (err) {
//     console.error('Error saving data to MongoDB:', err);
//   }
// };

const saveMqttData = async (topic, message) => {
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

      // Round the rain value to two decimal places
      const roundedRain = Math.round(data.rain * 100) / 100

      const newData = new model({
        tempC: data.tempC,
        humidity: data.humidity,
        rain: roundedRain,
        rainOutput: data.rain_output,
        distance: data.distance_cm, // This is required
        status: data.status,
        date: data.date,
        time: data.time,
        mongoDBtime: malaysiaTime, // Adjusted to Malaysia Time
      });

      // Save the data to MongoDB
      await newData.save();
      console.log(`Data saved to ${model.modelName}`);
    }
  } catch (err) {
    console.error('Error saving data to MongoDB:', err);
  }
};

const getLast10DurianTunggalData = async(req, res) => {
  try {
    const data = await DurianTunggal.find().sort({ time: -1 }).limit(10);
    res.json(data);
  } catch (err) {
      console.error('Error fetching data from MongoDB:', err);
      res.status(500).json({ error: 'An error occurred while fetching data' });
  }
}

const getLast10AyerKerohData = async(req, res) => {
  try {
    const data = await AyerKeroh.find().sort({ time: -1 }).limit(10);
    res.json(data);
  } catch (err) {
      console.error('Error fetching data from MongoDB:', err);
      res.status(500).json({ error: 'An error occurred while fetching data' });
  }
}

const getLast24DurianTunggalData = async(req, res) => {
  try {
    const data = await DurianTunggal.find().sort({ time: -1 })
          .limit(24)      
          .select('-_id tempC humidity rain distance date time mongoDBtime status'); 
          // Exclude _id, createdAt, and updatedAt fields;
    return data;
  } catch (err) {
    console.error('Error fetching Ayer Keroh data from MongoDB:', err);
    throw new Error('An error occurred while fetching Ayer Keroh data');
  }
}

const getLast24AyerKerohData = async(req, res) => {
  try {
    const data = await AyerKeroh.find().sort({ time: -1 })
            .limit(24)
            .select('-_id tempC humidity rain distance date time mongoDBtime status'); 
            // Exclude _id, createdAt, and updatedAt fields

    return data;
  } catch (err) {
    console.error('Error fetching Ayer Keroh data from MongoDB:', err);
    throw new Error('An error occurred while fetching Ayer Keroh data');
  }
}

const getAllAyerKerohData = async(req, res) => {
  try {
    const data = await AyerKeroh.find().sort({ time: -1 });
    res.json(data);
  } catch (err) {
    console.error('Error fetching data from MongoDB:', err);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
}

const getAllDurianTunggalData = async(req, res) => {
  try {
    const data = await DurianTunggal.find().sort({ time: -1 });
    res.json(data);
  } catch (err) {
    console.error('Error fetching data from MongoDB:', err);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
}

const returnAyerKerohData = async () => {
  try {
    const data = await AyerKeroh.find().sort({ time: -1 });
    //console.log("data: " , data);
    return data;
  } catch (err) {
    console.error('Error fetching Ayer Keroh data from MongoDB:', err);
    throw new Error('An error occurred while fetching Ayer Keroh data');
  }
}

const returnDurianTunggalData = async () => {
  try {
    const data = await DurianTunggal.find().sort({ time: -1 });
    //console.log("Data fetched from MongoDB:", data);
    return data;
  } catch (err) {
    console.error('Error fetching Durian Tunggal data from MongoDB:', err);
    throw new Error('An error occurred while fetching Durian Tunggal data');
  }
}

const returnAyerKeroh24Data = async () => {
  try {
    const data = await AyerKeroh.find().sort({ time: -1 }).limit(24);
    //console.log("data: " , data);
    return data;
  } catch (err) {
    console.error('Error fetching Ayer Keroh data from MongoDB:', err);
    throw new Error('An error occurred while fetching Ayer Keroh data');
  }
}

const returnDurianTunggal24Data = async () => {
  try {
    const data = await DurianTunggal.find().sort({ time: -1 }).limit(24);
    //console.log("Data fetched from MongoDB:", data);
    return data;
  } catch (err) {
    console.error('Error fetching Durian Tunggal data from MongoDB:', err);
    throw new Error('An error occurred while fetching Durian Tunggal data');
  }
}

const returnAlertData = async () => {
  try {
    let ayerKerohAlerts = await AyerKeroh.find({ status: { $in: ['Danger', 'Warning'] } });
    ayerKerohAlerts = ayerKerohAlerts.map(alert => ({
        ...alert.toObject(), // Convert mongoose document to plain object
        location: "Ayer Keroh",
        dateTime: new Date(`${alert.date}T${alert.time}`) // Combine date and time into a Date object
    }));

    let durianTunggalAlerts = await DurianTunggal.find({ status: { $in: ['Danger', 'Warning'] } });
    durianTunggalAlerts = durianTunggalAlerts.map(alert => ({
        ...alert.toObject(), // Convert mongoose document to plain object
        location: "Durian Tunggal",
        dateTime: new Date(`${alert.date}T${alert.time}`) // Combine date and time into a Date object
    }));

    // Combine both alert arrays
    let alertStatuses = [...ayerKerohAlerts, ...durianTunggalAlerts];

    // Sort the alerts by dateTime, with the latest first
    alertStatuses.sort((a, b) => b.dateTime - a.dateTime);
    // console.log(alertStatuses);
    
    return alertStatuses;
  } catch (err) {
    console.error('Error fetching Durian Tunggal data from MongoDB:', err);
    throw new Error('An error occurred while fetching Durian Tunggal data');
  }
}

const returnLatestAyerKerohDataStatus = async () => {
  try {
    const latestData = await AyerKeroh.findOne().sort({ time: -1 }).select('-_id status'); 
    console.log("latestData Mongo controller: ", latestData);
    return latestData;
  } catch (err) {
    console.error('Error fetching the latest Ayer Keroh data from MongoDB:', err);
    throw new Error('An error occurred while fetching the latest Ayer Keroh data');
  }
}

const returnLatestDurianTunggalDataStatus = async () => {
  try {
    const latestData = await DurianTunggal.findOne().sort({ time: -1 }).select('-_id status'); 
    console.log("latestData Mongo controller: ", latestData);
    return latestData;
  } catch (err) {
    console.error('Error fetching the latest Ayer Keroh data from MongoDB:', err);
    throw new Error('An error occurred while fetching the latest Ayer Keroh data');
  }
}

// Export all functions at once
module.exports = {
  saveMqttData,
  getLast10DurianTunggalData,
  getLast10AyerKerohData,
  getAllAyerKerohData,
  getAllDurianTunggalData,
  returnAyerKerohData,
  returnDurianTunggalData,
  returnAyerKeroh24Data,
  returnDurianTunggal24Data, 
  returnAlertData,
  getLast24DurianTunggalData,
  getLast24AyerKerohData,
  returnLatestAyerKerohDataStatus,
  returnLatestDurianTunggalDataStatus
};