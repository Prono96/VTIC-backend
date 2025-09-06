const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = "mongodb+srv://user:root@studentdb.ln38sdl.mongodb.net/?retryWrites=true&w=majority&appName=StudentDB";
    await mongoose.connect(uri);
    console.log('MongoDB connected');
    return mongoose.connection;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;