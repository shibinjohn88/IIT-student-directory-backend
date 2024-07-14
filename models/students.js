const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  host: process.env.RDS_HOSTNAME,
  port: process.env.RDS_PORT, // default Postgres port
  database: process.env.DATABASE 
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};