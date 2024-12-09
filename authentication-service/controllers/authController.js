const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { signToken, verifyToken } = require("../utils/jwtUtils");

const jwt = require("jsonwebtoken");

// Register user
exports.register = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(user._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

// Login user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // 2. Check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3. Generate and send JWT
  const token = signToken(user._id);

  res.json({
    status: "success",
    token,
  });
};

// Verify token
exports.verifyToken = catchAsync(async (req, res, next) => {
  const { token } = req.body;
  const decoded = verifyToken(token);
  res.status(200).json({ isValid: true, user: decoded });
});
