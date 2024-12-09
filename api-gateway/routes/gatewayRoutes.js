const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const { connectPatientService } = require("../controllers/gatewayController");

// Patient Routes
router.use("/api/v1/patients", authenticate, connectPatientService);

module.exports = router;
