const Appointment = require("../models/appointmentModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const pool = require("../db/redshift-db");

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
  // Step 1: Aggregate data
  const appointmentsPerDoctor = await aggregateAppointmentsPerDoctor();
  const appointmentFrequency = await aggregateAppointmentFrequency();
  const aggregatedSymptoms = await aggregateSymptomsBySpecialization();

  // Step 2: Insert data into Redshift
  await insertDataToRedshift("appointments_per_doctor", appointmentsPerDoctor);
  await insertDataToRedshift("appointment_frequency", appointmentFrequency);
  await insertDataToRedshift("symptoms_by_specialization", aggregatedSymptoms);

  res.status(200).json({
    status: "success",
    data: {
      appointmentsPerDoctor,
      appointmentFrequency,
      aggregatedSymptoms,
    },
  });
});

const insertDataToRedshift = async (table, data) => {
  const client = await pool.connect();

  try {
    if (table === "appointments_per_doctor") {
      const query = `
        MERGE INTO appointments_per_doctor USING (
          SELECT $1::VARCHAR AS doctor_id, $2::INT AS total_appointments
        ) AS incoming
        ON appointments_per_doctor.doctor_id = incoming.doctor_id
        WHEN MATCHED THEN UPDATE SET total_appointments = incoming.total_appointments
        WHEN NOT MATCHED THEN INSERT (doctor_id, total_appointments) VALUES (incoming.doctor_id, incoming.total_appointments);
      `;
      for (const record of data) {
        await client.query(query, [record._id, record.totalAppointments]);
      }
    }

    if (table === "appointment_frequency") {
      const query = `
        MERGE INTO appointment_frequency USING (
          SELECT $1::DATE AS appointment_date, $2::INT AS total_appointments
        ) AS incoming
        ON appointment_frequency.appointment_date = incoming.appointment_date
        WHEN MATCHED THEN UPDATE SET total_appointments = incoming.total_appointments
        WHEN NOT MATCHED THEN INSERT (appointment_date, total_appointments) VALUES (incoming.appointment_date, incoming.total_appointments);
      `;
      for (const record of data) {
        await client.query(query, [record._id.date, record.totalAppointments]);
      }
    }

    if (table === "symptoms_by_specialization") {
      const query = `
        MERGE INTO symptoms_by_specialization USING (
          SELECT $1::VARCHAR AS specialization, $2::VARCHAR AS symptom, $3::INT AS count
        ) AS incoming
        ON symptoms_by_specialization.specialization = incoming.specialization AND symptoms_by_specialization.symptom = incoming.symptom
        WHEN MATCHED THEN UPDATE SET count = incoming.count
        WHEN NOT MATCHED THEN INSERT (specialization, symptom, count) VALUES (incoming.specialization, incoming.symptom, incoming.count);
      `;
      for (const record of data) {
        const specialization = record._id;
        for (const symptom of record.symptoms) {
          await client.query(query, [
            specialization,
            symptom.symptom,
            symptom.count,
          ]);
        }
      }
    }
    console.log(`Data inserted into ${table}`);
  } catch (err) {
    console.error(`Error inserting data into ${table}`, err);
  } finally {
    await client.end();
  }
};
