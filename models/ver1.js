const mongoose = require('mongoose');

// Define the schema for the data
const dataSchema = new mongoose.Schema({
    tempC: Number,        // Store temperature in Celsius as a number
    humidity: Number,       // Store humidity as a number
    rain: Number,          
    rainOutput: String,      
    distance: { 
        type: Number, 
        required: true 
    },   
    status: String,         // Status of the system (e.g., "Normal", "Warning", "Danger")
    date: String,
    time: String,
    mongoDBtime: Date
}, { timestamps: true }); 

// Create models for AyerKeroh and DurianTunggal using the same schema
const AyerKeroh = mongoose.model('AyerKeroh', dataSchema);
const DurianTunggal = mongoose.model('DurianTunggal', dataSchema);

// Export both models
module.exports = { AyerKeroh, DurianTunggal };
