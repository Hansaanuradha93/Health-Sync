const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Doctor must have a name"] },
  specialization: {
    type: String,
    required: [true, "Specialization is required"],
  },
  availability: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);
