const mongoose = require('mongoose');

// Define the schema for the data
const dataSchema = new mongoose.Schema({
    tempC: Number,        // Store temperature in Celsius as a number
    humidity: Number,       // Store humidity as a number
    rain: String,           // Rain status (e.g., "No Rain", "Light Rain", etc.)
    rainValue: Number,      // Store rain sensor value as a number
    distance: { 
        type: Number, 
        required: true 
    },   
    status: String,         // Status of the system (e.g., "Normal", "Warning", "Danger")
    time: String,           // Store the time as a string (e.g., "14:30")
    date: String,           // Store the date as a string (e.g., "2024-08-23")
}, { timestamps: true }); 

// Create models for AyerKeroh and DurianTunggal using the same schema
const AyerKeroh = mongoose.model('AyerKeroh', dataSchema);
const DurianTunggal = mongoose.model('DurianTunggal', dataSchema);

// Export both models
module.exports = { AyerKeroh, DurianTunggal };
