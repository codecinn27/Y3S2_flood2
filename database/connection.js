const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected: ${mongoose.connection.host}`);
        
    }catch(error){
        console.log("Error connecting to Mongodb ",error);
        throw error;
    }
}

module.exports = {connectDB};