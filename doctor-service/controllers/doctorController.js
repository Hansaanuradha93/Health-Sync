const Doctor = require("../models/doctorModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Check doctor availability
exports.checkAvailability = catchAsync(async (req, res, next) => {
  const { date, time } = req.body;

  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) {
    return next(new AppError("Doctor not found", 404));
  }

  // Check availability
  const isAvailable = doctor.availability.some(
    (slot) =>
      slot.day ===
        new Date(date).toLocaleDateString("en-US", { weekday: "long" }) &&
      time >= slot.startTime &&
      time <= slot.endTime,
  );

  res.status(200).json({
    status: "success",
    available: isAvailable,
    doctor,
  });
});

// Create a new doctor
exports.createDoctor = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.create(req.body);

  res.status(201).json({
    status: "success",
    data: { doctor },
  });
});

/// Get all doctors
exports.getAllDoctors = catchAsync(async (req, res, next) => {
  const doctors = await Doctor.find();

  res.status(200).json({
    status: "success",
    results: doctors.length,
    data: { doctors },
  });
});

/// Get a specific doctor
exports.getDoctorById = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(new AppError("Doctor not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { doctor },
  });
});

/// Update a doctor
exports.updateDoctor = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doctor) {
    return next(new AppError("Doctor not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { doctor },
  });
});

/// Delete an doctor
exports.deleteDoctor = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findByIdAndDelete(req.params.id);

  if (!doctor) {
    return next(new AppError("Doctor not found", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
