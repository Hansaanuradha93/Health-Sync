const mongoose = require("mongoose");
const validator = require("validator");

// Prescription Schema
const prescriptionSchema = new mongoose.Schema({
  drug: {
    type: String,
    required: [true, "Prescription must include a drug name"],
  },
  dosage: {
    type: String,
    required: [true, "Prescription must include a dosage"],
  },
  frequency: {
    type: String,
    required: [true, "Prescription must include a frequency"],
  },
});

// Lab Result Schema
const labResultSchema = new mongoose.Schema({
  testName: {
    type: String,
    required: [true, "Lab result must include a test name"],
  },
  date: {
    type: String,
    required: [true, "Lab result must include a date"],
  },
  result: {
    type: String,
    required: [true, "Lab result must include a result"],
  },
});

// Patient Schema
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Patient must have a name"],
  },
  age: {
    type: Number,
    required: [true, "Patient must have an age"],
    min: [0, "Age must be greater than or equal to 0"],
    max: [150, "Age must be less than or equal to 150"],
  },
  gender: {
    type: String,
    required: [true, "Patient must have a gender"],
    enum: {
      values: ["male", "female"],
      message: "Gender must be either 'male', 'female'",
    },
  },
  email: {
    type: String,
    required: [true, "User must have an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  contact: {
    type: String,
    required: [true, "Patient must have a contact number"],
  },
  address: {
    type: String,
    required: [true, "Patient must have an address"],
  },
  medicalHistory: {
    type: [String],
    default: [],
  },
  prescriptions: {
    type: [prescriptionSchema],
    default: [],
  },
  labResults: {
    type: [labResultSchema],
    default: [],
  },
});

module.exports = mongoose.model("Patient", patientSchema);
