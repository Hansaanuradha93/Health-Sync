/* eslint-disable no-console */
const mongoose = require("mongoose");

/// Connect to the database
exports.connectDB = async () => {
  /// Define the database connection URI
  const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );
  /// Connect to the database using mongoose
  try {
    await mongoose.connect(DB);
    console.log("DB connection successful!");
  } catch (err) {
    console.error("DB connection error:", err.message);
  }
};
