const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const {
  connectPatientService,
  connectAppointmentService,
  connectDoctorService,
} = require("../controllers/gatewayController");

// Patient Routes
router.use("/api/v1/patients", authenticate, connectPatientService);

// Appointment Routes
router.use("/api/v1/appointments", authenticate, connectAppointmentService);

// Doctor Routes
router.use("/api/v1/doctors", authenticate, connectDoctorService);

module.exports = router;
