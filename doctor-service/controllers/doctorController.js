const Doctor = require("../models/doctorModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Create a new doctor
exports.createDoctor = catchAsync(async (req, res, next) => {
  res.status(201).json({
    status: "not implemented",
  });
});

/// Get all doctors
exports.getAllDoctors = catchAsync(async (req, res, next) => {
  res.status(201).json({
    status: "not implemented",
  });
});

/// Get a specific doctor
exports.getDoctorById = catchAsync(async (req, res, next) => {
  res.status(201).json({
    status: "not implemented",
  });
});

/// Update an doctor
exports.updateDoctor = catchAsync(async (req, res, next) => {
  res.status(201).json({
    status: "not implemented",
  });
});

/// Delete an doctor
exports.deleteDoctor = catchAsync(async (req, res, next) => {
  res.status(201).json({
    status: "not implemented",
  });
});
