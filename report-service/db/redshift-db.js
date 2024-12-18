const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.REDSHIFT_HOST,
  port: process.env.REDSHIFT_PORT,
  user: process.env.REDSHIFT_USER,
  password: process.env.REDSHIFT_PASSWORD,
  database: process.env.REDSHIFT_DATABASE,
});

module.exports = pool;
