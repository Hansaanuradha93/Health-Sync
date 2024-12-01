const jwt = require("jsonwebtoken");
// const bcrypt = require('bcrypt');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { userSchema } = require("../models/userModel");
const { generateToken } = require("../utils/jwtUtils");

exports.register = catchAsync(async (req, res, next) => {
  res.status(404).json({
    status: "not implemented",
  });
});

exports.login = async (req, res) => {
  res.status(404).json({
    status: "not implemented",
  });
};
