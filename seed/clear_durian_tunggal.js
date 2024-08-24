require('dotenv').config();
const mongoose = require('mongoose');
const { DurianTunggal } = require('../models/ver1'); // Adjust the path to your model file

// Check if MONGO_URL is set
if (!process.env.MONGO_URL) {
    console.error('MONGO_URL is not defined');
    process.exit(1); // Exit the process with an error code
}
  
// Connect to your MongoDB database
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Delete all data from the AyerKeroh collection
    DurianTunggal.deleteMany({})
      .then(() => {
        console.log('All data deleted from the AyerKeroh collection');
        mongoose.connection.close(); // Close the database connection when done
      })
      .catch((err) => {
        console.error('Error deleting data:', err);
        mongoose.connection.close(); // Close the database connection in case of an error
      });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
