const Appointment = require("../models/appointmentModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { validatePatient, notifyPatient } = require("../utils/helper");

// Create a new appointment
exports.createAppointment = catchAsync(async (req, res, next) => {
  // Validate patient
  const patient = await validatePatient(req.body.patientId);
  if (!patient) {
    return next(new AppError("Patient not found", 404));
  }

  // Create appointment
  const appointment = await Appointment.create({
    ...req.body,
    email: patient.email,
  });

  // Trigger notification
  await notifyPatient(appointment, "created");

  res.status(201).json({
    status: "success",
    data: { appointment },
  });
});

/// Get all appointments
exports.getAllAppointments = catchAsync(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    status: "success",
    results: appointments.length,
    data: { appointments },
  });
});

/// Get a specific appointment
exports.getAppointmentById = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    return next(new AppError("Appointment not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: { appointment },
  });
});

/// Update an appointment
exports.updateAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true },
  );

  if (!appointment) {
    return next(new AppError("Appointment not found", 404));
  }

  // Notify patient about the update
  await notifyPatient(appointment, "updated");

  res.status(200).json({
    status: "success",
    data: { appointment },
  });
});

/// Delete an appointment
exports.deleteAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findByIdAndDelete(req.params.id);

  if (!appointment) {
    return next(new AppError("Appointment not found", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
