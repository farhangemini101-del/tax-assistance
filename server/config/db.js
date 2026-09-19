const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tax_assistance';
  
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Quick timeout so we don't stall if local mongod is absent
    });
    isConnected = true;
    console.log(`[Database] MongoDB connected successfully to ${uri}`);
  } catch (err) {
    console.warn(`[Database] MongoDB connection failed (${err.message}). Activating local embedded resilient storage.`);
    isConnected = false;
  }
};

const getDBStatus = () => ({
  connected: isConnected,
  mode: isConnected ? 'MongoDB' : 'Local Embedded / Memory Store',
});

module.exports = { connectDB, getDBStatus };
