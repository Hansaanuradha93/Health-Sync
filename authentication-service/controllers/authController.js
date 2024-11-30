const jwt = require("jsonwebtoken");
// const bcrypt = require('bcrypt');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { userSchema } = require("../models/userModel");
const pool = require('../db/db')
const { generateToken } = require('../utils/jwtUtils');

exports.register = catchAsync(async (req, res, next) => {
  // Validate request body
  const { error } = userSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  // Check if user already exists
  const { username, email, password, role } = req.body;

  const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (existingUser.rows.length > 0) {
    return next(new AppError("Email already exists", 400));
  }

  // Hash the password
  // const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the new user into the database
  const createdAt = new Date();
  const updatedAt = createdAt;
  
  const newUser = await pool.query(
    `INSERT INTO users (username, email, password, role, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [username, email, password, role, createdAt, updatedAt]
  );

  const user = newUser.rows[0];

  // // Generate JWT token
  // const payload = {
  //   id: user.id,
  //   email: user.email,
  //   username: user.username,
  //   role: user.role,
  // }
  // // const token = generateToken(payload)
  // const token = jwt.sign(
  //   {
  //     id: user.id,
  //     email: user.email,
  //     username: user.username,
  //     role: user.role,
  //   },
  //   process.env.JWT_SECRET,
  //   { expiresIn: process.env.JWT_EXPIRES_IN },
  // );

  // Send the response
  res.status(201).json({
    status: "success",
    // token,
    data: {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    },
  });
});

exports.login = async (req, res) => {
  res.status(404).json({
    status: "not implemented",
  });
};
