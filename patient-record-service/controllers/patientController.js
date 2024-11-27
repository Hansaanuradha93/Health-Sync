const { patientSchema } = require("../models/patientModel");
const pool = require("../db");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllPatients = catchAsync(async (req, res, next) => {
  const query = "SELECT * FROM patients;";
  const result = await pool.query(query);

  res.status(200).json({
    status: "success",
    results: result.rows.length,
    data: {
      patients: result.rows,
    },
  });
});

exports.getPatientByID = catchAsync(async (req, res, next) => {
  const query = "SELECT * FROM patients WHERE id = $1;";
  const result = await pool.query(query, [req.params.id]);

  if (result.rows.length === 0) {
    return next(new AppError(`No patient found with id ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      patient: result.rows[0],
    },
  });
});

exports.createPatient = catchAsync(async (req, res, next) => {
  // Validate request body
  const { error } = patientSchema.validate(req.body);
  if (error) {
    return next(
      new AppError(`Validation error: ${error.details[0].message}`),
      404
    );
  }

  // SQL query
  const query = `
    INSERT INTO patients (name, age, gender, contact, address, medicalHistory, prescriptions, labResults)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
  `;

  // Get values from the request body
  const values = [
    req.body.name,
    req.body.age,
    req.body.gender,
    req.body.contact,
    req.body.address,
    req.body.medicalHistory,
    JSON.stringify(req.body.prescriptions),
    JSON.stringify(req.body.labResults),
  ];

  // Execute query
  const result = await pool.query(query, values);

  // Retrieve newly inserted patient
  const newPatient = result.rows[0];

  // Send response
  res.status(201).json({
    status: "success",
    data: {
      patient: newPatient,
    },
  });
});

exports.updatePatient = catchAsync(async (req, res, next) => {
  const query = `
    UPDATE patients
    SET name = COALESCE($1, name),
        age = COALESCE($2, age),
        gender = COALESCE($3, gender),
        contact = COALESCE($4, contact),
        address = COALESCE($5, address),
        medicalHistory = COALESCE($6, medicalHistory),
        prescriptions = COALESCE($7, prescriptions),
        labResults = COALESCE($8, labResults)
    WHERE id = $9
    RETURNING *;`;

  const values = [
    req.body.name,
    req.body.age,
    req.body.gender,
    req.body.contact,
    req.body.address,
    req.body.medicalHistory,
    JSON.stringify(req.body.prescriptions),
    JSON.stringify(req.body.labResults),
    req.params.id,
  ];

  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    return next(new AppError(`No patient found with id ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      patient: result.rows[0],
    },
  });
});

exports.deletePatient = catchAsync(async (req, res, next) => {
  const query = "DELETE FROM patients WHERE id = $1 RETURNING *;";
  const result = await pool.query(query, [req.params.id]);

  if (result.rows.length === 0) {
    return next(new AppError(`No patient found with id ${req.params.id}`, 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
