const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const axios = require("axios");

exports.connectPatientService = catchAsync(async (req, res, next) => {
  if (req.method === "GET") {
    const response = await axios.get(url);
    res.status(response.status).json(response.data);
  } else if (req.method === "POST") {
    const response = await axios.post(url, req.body);
    res.status(response.status).json(response.data);
  } else if (req.method == "PATCH") {
    const response = await axios.patch(url, req.body);
    res.status(response.status).json(response.data);
  } else if (req.method === "DELETE") {
    const response = await axios.delete(url);
    res.status(response.status).json(response.data);
  }
});