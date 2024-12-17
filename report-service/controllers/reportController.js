const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");
const Patient = require("../models/patientModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

/**
 * Aggregate symptoms by doctor's specialization.
 * @returns {Promise<Array>} Aggregated data array
 */
const aggregateSymptomsBySpecialization = async () => {
  return await Appointment.aggregate([
    {
      $lookup: {
        from: "doctors", // Reference to doctors collection
        localField: "doctorId",
        foreignField: "_id",
        as: "doctorDetails",
      },
    },
    { $unwind: "$doctorDetails" },
    { $unwind: "$symptoms" },
    {
      $group: {
        _id: {
          specialization: "$doctorDetails.specialization",
          symptom: "$symptoms",
        },
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: "$_id.specialization",
        symptoms: {
          $push: {
            symptom: "$_id.symptom",
            count: "$count",
          },
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);
};

/**
 * Aggregate the number of appointments per doctor.
 * @returns {Promise<Array>} Aggregated data with doctor ID and appointment count.
 */
const aggregateAppointmentsPerDoctor = async () => {
  return await Appointment.aggregate([
    {
      $group: {
        _id: "$doctorId",
        totalAppointments: { $sum: 1 },
      },
    },
    { $sort: { totalAppointments: -1 } }, // Sort by totalAppointments descending
  ]);
};

/**
 * Aggregate the frequency of appointments over time.
 * @returns {Promise<Array>} Aggregated data grouped by appointment date.
 */
const aggregateAppointmentFrequency = async () => {
  return await Appointment.aggregate([
    {
      $group: {
        _id: { date: "$date" },
        totalAppointments: { $sum: 1 },
      },
    },
    { $sort: { "_id.date": 1 } }, // Sort by date ascending
  ]);
};

// Generate reports
exports.aggregateAndStoreData = catchAsync(async (req, res, next) => {
  // Step 1: Aggregate appointments per doctor
  const appointmentsPerDoctor = await aggregateAppointmentsPerDoctor();
  console.log("Appointments Per Doctor:", appointmentsPerDoctor);

  // Step 2: Aggregate appointment frequency over time
  const appointmentFrequency = await aggregateAppointmentFrequency();
  console.log("Appointment Frequency:", appointmentFrequency);

  if (!appointmentsPerDoctor.length && !appointmentFrequency.length) {
    return next(
      new AppError("No appointment data available for reporting.", 404)
    );
  }

  // Step 3: Aggregate symptoms data by specialization
  const aggregatedSymptoms = await aggregateSymptomsBySpecialization();

  if (!aggregatedSymptoms || aggregatedSymptoms.length === 0) {
    return next(new AppError("No data found for aggregation.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      appointmentsPerDoctor,
      appointmentFrequency,
      aggregatedSymptoms,
    },
  });
});
