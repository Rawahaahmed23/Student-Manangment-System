const mongoose = require("mongoose");

const URL = process.env.MONGODB_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

module.exports = connectDb;