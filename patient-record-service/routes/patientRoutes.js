const express = require("express");
const router = express.Router();

const {
  getAllPatients,
  getPatientByID,
  createPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController");

router.route("/").get(getAllPatients).post(createPatient);

router
  .route("/:id")
  .get(getPatientByID)
  .patch(updatePatient)
  .delete(deletePatient);

module.exports = router;
