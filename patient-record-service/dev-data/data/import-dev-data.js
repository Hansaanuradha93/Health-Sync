/* eslint-disable no-console */
const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Patient = require("../../models/patientModel");
const { connectDB } = require("../../db/db");

/// Path for application configuration
dotenv.config({ path: "./config.env" });

/// Connect to the database
connectDB();

// Exit the process cleanly
const exitProcess = async () => {
  try {
    await mongoose.connection.close();
    console.log("Exiting process...");
  } catch (err) {
    console.error("Error closing MongoDB connection:", err.message);
  } finally {
    process.exit();
  }
};

/// Read tour data from filesystem
const patientsData = JSON.parse(
  fs.readFileSync(`${__dirname}/patients.json`, "utf-8"),
);

/// Delete all patient data from database
const deleteData = async () => {
  try {
    await Patient.deleteMany();
    console.log("Data deleted successfully!");
  } catch (err) {
    console.error("Error deleting data:", err.message);
  } finally {
    await exitProcess();
  }
};

/// Import tour and user data to mongodb database
const importData = async () => {
  try {
    /// Import all tour data
    await Patient.deleteMany();
    await Patient.create(patientsData);
    console.log("Patient data imported successfully!");
  } catch (err) {
    console.error("Error importing data:", err.message);
  } finally {
    await exitProcess();
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
