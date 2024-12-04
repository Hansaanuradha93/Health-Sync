const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

/// Get all appointments
exports.sendNotification = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: "not implemented",
  });
});
