const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

/// Get all appointments
exports.sendNotification = catchAsync(async (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    status: "not implemented",
  });
});
