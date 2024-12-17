const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  day: {
    type: String,
    required: [true, "Day is required"],
    enum: {
      values: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      message: "Day must be a valid weekday",
    },
  },
  startTime: {
    type: String,
    required: [true, "Start time is required"],
    validate: {
      validator: function (value) {
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value); // 24-hour time format
      },
      message: "Start time must be in HH:mm format",
    },
  },
  endTime: {
    type: String,
    required: [true, "End time is required"],
    validate: {
      validator: function (value) {
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value); // 24-hour time format
      },
      message: "End time must be in HH:mm format",
    },
  },
});

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Doctor must have a name"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Simple email regex
      },
      message: "Invalid email format",
    },
  },
  specialization: {
    type: String,
    required: [true, "Specialization is required"],
  },
  contact: {
    type: String,
    required: [true, "Contact number is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  experienceYears: {
    type: Number,
    min: [0, "Experience years cannot be negative"],
    default: 0,
  },
  rating: {
    type: Number,
    min: [0, "Rating cannot be negative"],
    max: [5, "Rating cannot exceed 5"],
    default: 0,
  },
  availability: {
    type: [availabilitySchema],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);
