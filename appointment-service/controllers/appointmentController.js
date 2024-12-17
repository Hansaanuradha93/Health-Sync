const Appointment = require("../models/appointmentModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const {
  validatePatient,
  validateDoctor,
  notifyPatient,
} = require("../utils/helper");

// Create a new appointment
exports.createAppointment = catchAsync(async (req, res, next) => {
  const { patientId, doctorId, date, time, status } = req.body;

  // Validate patient
  const patient = await validatePatient(patientId);
  if (!patient) {
    return next(new AppError("Patient not found", 404));
  }

  // Validate doctor
  const doctor = await validateDoctor(doctorId, date, time);
  if (!doctor) {
    return next(new AppError("Doctor is not available", 404));
  }

  // Create appointment
  const appointment = await Appointment.create({
    patientId,
    doctorId,
    date,
    time,
    status,
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

  // Check doctor availability
  const doctor = await validateDoctor(
    appointment.doctorId,
    appointment.date,
    appointment.time,
  );
  if (!doctor) {
    return next(new AppError("Doctctor is not available", 404));
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
