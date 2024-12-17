const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const axios = require("axios");

exports.connectPatientService = catchAsync(async (req, res, next) => {
  const url = `${process.env.PATIENT_SERVICE_URL}${req.originalUrl}`;

  if (req.method === "GET") {
    const response = await axios.get(url);
    res.status(response.status).json(response.data);
  } else if (req.method === "POST") {
    const response = await axios.post(url, req.body);
    res.status(response.status).json(response.data);
  } else if (req.method == "PATCH") {
    const response = await axios.patch(url, req.body);
    res.status(response.status).json(response.data);
  } else if (req.method === "DELETE") {
    const response = await axios.delete(url);
    res.status(response.status).json(response.data);
  }
});

exports.connectAppointmentService = catchAsync(async (req, res, next) => {
  const url = `${process.env.APPOINTMENT_SERVICE_URL}${req.originalUrl}`;

  if (req.method === "GET") {
    const response = await axios.get(url);
    res.status(response.status).json(response.data);
  } else if (req.method === "POST") {
    const response = await axios.post(url, req.body);
    res.status(response.status).json(response.data);
  } else if (req.method == "PATCH") {
    const response = await axios.patch(url, req.body);
    res.status(response.status).json(response.data);
  } else if (req.method === "DELETE") {
    const response = await axios.delete(url);
    res.status(response.status).json(response.data);
  }
});

exports.connectDoctorService = catchAsync(async (req, res, next) => {
  const url = `${process.env.DOCTOR_SERVICE_URL}${req.originalUrl}`;

  if (req.method === "GET") {
    const response = await axios.get(url);
    res.status(response.status).json(response.data);
  } else if (req.method === "POST") {
    const response = await axios.post(url, req.body);
    res.status(response.status).json(response.data);
  } else if (req.method == "PATCH") {
    const response = await axios.patch(url, req.body);
    res.status(response.status).json(response.data);
  } else if (req.method === "DELETE") {
    const response = await axios.delete(url);
    res.status(response.status).json(response.data);
  }
});

exports.connectReportService = catchAsync(async (req, res, next) => {
  const url = `${process.env.REPORT_SERVICE_URL}${req.originalUrl}`;
  console.log(`url: ${url}`);

  if (req.method === "GET") {
    const response = await axios.get(url);
    res.status(response.status).json(response.data);
  } else if (req.method === "POST") {
    console.log(`POST REQUEST START`);
    const response = await axios.post(url, req.body);
    res.status(response.status).json(response.data);
  } else if (req.method == "PATCH") {
    const response = await axios.patch(url, req.body);
    res.status(response.status).json(response.data);
  } else if (req.method === "DELETE") {
    const response = await axios.delete(url);
    res.status(response.status).json(response.data);
  }
});
