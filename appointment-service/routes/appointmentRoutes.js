const express = require("express");
const router = express.Router();

const {
  getAllAppointments,
  createAppointment,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");

router.route("/").get(getAllAppointments).post(createAppointment);

router
  .route("/:id")
  .get(getAppointmentById)
  .patch(updateAppointment)
  .delete(deleteAppointment);

module.exports = router;
