const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");
const Patient = require("../models/patientModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Create a new appointment
exports.aggregateAndStoreData = catchAsync(async (req, res, next) => {
  res.status(404).json({
    status: "not implemented",
  });
});
