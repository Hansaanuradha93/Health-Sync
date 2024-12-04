const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/emailService");

/// Send email notification
exports.sendNotification = catchAsync(async (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    status: "not implemented",
  });
});

const sendNotification = catchAsync(async (req, res, next) => {
  const { to, subject, text } = req.body;

  // Send email
  await sendEmail(to, subject, text);

  // Send response
  res.status(200).json({
    status: "success",
    message: "Email sent successfully",
  });
});

module.exports = { sendNotification };
