/* eslint-disable no-console */
const dotenv = require("dotenv");
const { connectDB } = require("./db/db");

/// Handle all uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! 💥 SHUTTING DOWN...");
  console.error(err);
  process.exit(1);
});

/// Path for application configuration
dotenv.config({ path: "./config.env" });

/// Require the app
const app = require("./app");

// /// Define the database connection URI
// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

//
// const connectDB = async () => {
//   try {
//     await mongoose.connect(DB);
//     console.log("DB connection successful!");
//   } catch (err) {
//     console.error("DB connection error:", err.message);
//   }
// };

/// Connect to the database
connectDB();

/// Run the server
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

/// Handle all unhandled rejections
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! 💥 SHUTTING DOWN...");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
