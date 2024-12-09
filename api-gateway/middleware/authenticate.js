const axios = require("axios");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }

    const authURL = `${process.env.AUTH_SERVICE_URL}/verifyToken`;
    const response = await axios.post(authURL, { token });

    if (response.data.isValid) {
      req.user = response.data.user;
      next();
    } else {
      res.status(401).json({ status: "fail", message: "Invalid token" });
    }
  } catch (error) {
    res.status(401).json({ status: "fail", message: "Authentication failed" });
  }
};

module.exports = authenticate;
