const express = require("express");
const router = express.Router();

const { sendNotification } = require("../controllers/notificationController");

router.route("/").post(sendNotification);

module.exports = router;
