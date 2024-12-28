const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const {
  connectPatientService,
  connectAppointmentService,
  connectDoctorService,
  connectReportService,
  connectAuthService,
} = require("../controllers/gatewayController");

// Patient Routes
router.use("/api/v1/patients", authenticate, connectPatientService);

// Appointment Routes
router.use("/api/v1/appointments", authenticate, connectAppointmentService);

// Doctor Routes
router.use("/api/v1/doctors", authenticate, connectDoctorService);

// Report Routes
router.use("/api/v1/reports", authenticate, connectReportService);

// Authentication Routes
router.use("/api/v1/auth", connectAuthService);

module.exports = router;
