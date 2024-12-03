const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: [true, "Appointment must be linked to a patient"],
  },
  doctor: {
    type: String,
    required: [true, "Appointment must have a doctor"],
  },
  date: {
    type: String,
    required: [true, "Appointment must have a date"],
  },
  time: {
    type: String,
    required: [true, "Appointment must have a time"],
  },
  status: {
    type: String,
    required: [true, "Appointment must have a status"],
    enum: ["scheduled", "completed", "cancelled"],
    default: "scheduled",
  },
  email: {
    type: String,
    required: [true, "Patient's email must be included"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
