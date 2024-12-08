const express = require("express");
const router = express.Router();

const {
  register,
  login,
  verifyToken,
} = require("../controllers/authController");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/verifyToken").post(verifyToken);

module.exports = router;
