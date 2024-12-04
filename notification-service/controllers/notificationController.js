const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/emailService");

/// Send email notification
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
