/// Require modules
const express = require("express");
const morgan = require("morgan");

/// Create an instance of Express
const app = express();

/// 1). MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

module.exports = app;
