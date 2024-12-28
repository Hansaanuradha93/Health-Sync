const axios = require("axios");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const authenticate = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }

  const authURL = `${process.env.AUTH_SERVICE_END_POINT_URL}/verifyToken`;
  const response = await axios.post(authURL, { token });

  if (response.data.isValid) {
    req.user = response.data.user;
    next();
  } else {
    return next(new AppError(`Invalid token`, 401));
  }
});

module.exports = authenticate;
