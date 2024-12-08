const express = require("express");
const router = express.Router();

const {
  getAllDoctors,
  createDoctor,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  checkAvailability,
} = require("../controllers/doctorController");

router.route("/").get(getAllDoctors).post(createDoctor);

router
  .route("/:id")
  .get(getDoctorById)
  .patch(updateDoctor)
  .delete(deleteDoctor);

router.route("/:id/availability").post(checkAvailability);

module.exports = router;
