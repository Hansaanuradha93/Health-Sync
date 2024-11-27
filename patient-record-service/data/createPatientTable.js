/* eslint-disable no-console */
const pool = require("../db");
const catchAsync = require("../utils/catchAsync");

const createPatientTable = catchAsync(async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      age INT NOT NULL,
      gender VARCHAR(10) NOT NULL,
      contact VARCHAR(255) NOT NULL,
      address TEXT NOT NULL,
      medicalHistory TEXT[],
      prescriptions JSONB,
      labResults JSONB
    );
  `;

  await pool.query(query);
  console.log("Patients table created successfully");
});

module.exports = createPatientTable;
