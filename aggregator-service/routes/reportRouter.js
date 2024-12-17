const express = require("express");
const router = express.Router();

const { aggregateAndStoreData } = require("../controllers/reportController");

router.route("/").post(aggregateAndStoreData);

module.exports = router;
