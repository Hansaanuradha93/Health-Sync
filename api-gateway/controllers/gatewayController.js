const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const axios = require("axios");

exports.connectPatientService = catchAsync(async (req, res, next) => {
  const response = await axios({
    method: req.method,
    url: `${process.env.PATIENT_SERVICE_URL}`,
    data: req.body,
    headers: req.headers,
  });
  res.status(response.status).json(response.data);
});
