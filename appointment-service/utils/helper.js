const axios = require("axios");

// Validate doctor
exports.validateDoctor = async (doctorId) => {
  const doctorUrl = `${process.env.DOCTOR_SERVICE_URL}/${doctorId}`;
  const response = await axios.get(doctorUrl);
  return response.data.data.doctor;
};

// Validate patient
exports.validatePatient = async (patientId) => {
  const patientUrl = `${process.env.PATIENT_SERVICE_URL}/${patientId}`;
  const response = await axios.get(patientUrl);
  return response.data.data.patient;
};

// Notify patient about the appointment
exports.notifyPatient = async (appointment, operationType) => {
  const { email } = appointment;
  const { subject, message } = generateNotificationContent(
    appointment,
    operationType,
  );

  await axios.post(`${process.env.NOTIFICATION_SERVICE_URL}`, {
    to: email,
    subject,
    text: message,
  });
};

const generateNotificationContent = (appointment, operationType) => {
  const { doctorId, date, time, status, patientId, _id } = appointment;

  let subject;
  let message;

  if (operationType === "created") {
    subject = "Appointment Confirmation";
    message = `Your appointment has been scheduled on ${date} at ${time}.`;
  } else if (operationType === "updated") {
    subject = "Appointment Updated";

    switch (status) {
      case "scheduled":
        message = `Your appointment has been re-scheduled to ${date} at ${time}.`;
        break;
      case "completed":
        message = `Your appointment on ${date} has been marked as completed.`;
        break;
      case "cancelled":
        message = `Your appointment on ${date} has been cancelled.`;
        break;
      default:
        message = `Your appointment has been updated.`;
    }
  } else {
    throw new Error(
      "Invalid operation type. Supported types are 'create' and 'update'.",
    );
  }

  return { subject, message };
};
