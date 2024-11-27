/* eslint-disable no-console */
const { Pool } = require("pg");

// Set up the database connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
const connectDatabase = async () => {
  try {
    await pool.connect();
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

connectDatabase();

module.exports = pool;
