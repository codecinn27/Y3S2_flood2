const { AyerKeroh, DurianTunggal } = require('../models/ver1'); // Adjust the path to your models

// Controller function to query and display data
module.exports.displayDataPerMinute = async (req, res) => {
    try {
      // Choose the model based on the topic (adjust as needed)
      const model = DurianTunggal; // or DurianTunggal depending on your use case
  
      // Fetch all the data from the collection
      const allData = await model.find({}).sort({ time: 1 }).exec();
  
      // Filter data to get only one record per minute
      const filteredData = [];
      let lastMinute = null;
  
      allData.forEach((entry) => {
        const entryMinute = new Date(entry.time).getMinutes();
        if (lastMinute !== entryMinute) {
          filteredData.push(entry);
          lastMinute = entryMinute;
        }
      });
  
      // Render the history.ejs page with the filtered data
      res.render('test/history', { data: filteredData });
  
    } catch (err) {
      console.error('Error querying data:', err);
      res.status(500).send('Internal Server Error');
    }
  };