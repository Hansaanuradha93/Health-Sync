const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Doctor must have a name"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Email validation
      },
      message: "Invalid email format",
    },
  },
  specialization: {
    type: String,
    required: [true, "Specialization is required"],
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
