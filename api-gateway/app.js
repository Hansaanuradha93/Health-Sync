/// Require modules
const express = require("express");
const morgan = require("morgan");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const gatewayRouter = require("./routes/gatewayRoutes");

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

/// 2). ROUTES
app.use(gatewayRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

/// 3). ERROR HANDLER MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
