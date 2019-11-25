const Pool = require('pg').Pool
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  user: process.env.TEST_DB_USER,
  host: process.env.TEST_DB_HOST,
  database: process.env.TEST_DB_NAME,
  password: process.env.TEST_DB_PASS,
  port: process.env.TEST_DB_PORT
});

pool.on('connect', () => {
  console.log('connected to the Test Database');
});


module.exports = pool;