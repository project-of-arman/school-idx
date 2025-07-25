
import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

function getPool() {
  if (pool) {
    return pool;
  }

  // NOTE: Add your database credentials to a .env.local file in the root of your project.
  // Example .env.local file:
  // DB_HOST=your_host
  // DB_USER=your_user
  // DB_PASSWORD=your_password
  // DB_NAME=your_database_name
  if (
    !process.env.DB_HOST ||
    !process.env.DB_USER ||
    !process.env.DB_PASSWORD ||
    !process.env.DB_NAME
  ) {
    // Return null if we don't have credentials.
    // This allows the app to run without a database for development.
    return null;
  }

  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  return pool;
}

const db = getPool();
export default db;
