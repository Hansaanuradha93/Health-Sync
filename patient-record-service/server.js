/* eslint-disable no-console */
const dotenv = require("dotenv");

/// Handle all uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! 💥 SHUTTING DOWN...");
  console.error(err.name, err);
  process.exit(1);
});

/// Path for application configuration
dotenv.config({ path: "./config.env" });

/// Require the app
const app = require("./app");

/// Run the server
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

/// Handle all unhandled rejections
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! 💥 SHUTTING DOWN...");
  console.error(err.name, err);
  server.close(() => {
    process.exit(1);
  });
});
