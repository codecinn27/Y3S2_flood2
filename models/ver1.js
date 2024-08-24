const mongoose = require('mongoose');

// Define the schema for the data
const dataSchema = new mongoose.Schema({
    tempC: Number,        // Store temperature in Celsius as a number
    humidity: Number,       // Store humidity as a number
    rain: Number,           // Rain status (e.g., "No Rain", "Light Rain", etc.)
    rainOutput: String,      // Store rain sensor value as a number
    distance: { 
        type: Number, 
        required: true 
    },   
    status: String,         // Status of the system (e.g., "Normal", "Warning", "Danger")
    time: Date, // Time field from the incoming message
}, { timestamps: true }); 

// Create models for AyerKeroh and DurianTunggal using the same schema
const AyerKeroh = mongoose.model('AyerKeroh', dataSchema);
const DurianTunggal = mongoose.model('DurianTunggal', dataSchema);

// Export both models
module.exports = { AyerKeroh, DurianTunggal };
