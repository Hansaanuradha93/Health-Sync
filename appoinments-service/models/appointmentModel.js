const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: [true, "Appointment must belong to a patient"],
  },
  doctor: {
    type: String,
    required: [true, "Appointment must include a doctor"],
  },
  date: {
    type: Date,
    required: [true, "Appointment must include a date"],
  },
  time: {
    type: String,
    required: [true, "Appointment must include a time"],
  },
  status: {
    type: String,
    enum: ["scheduled", "completed", "canceled"],
    default: "scheduled",
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
