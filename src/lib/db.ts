
import mysql from 'mysql2/promise';

// Extend the NodeJS global type to include our MySQL pool
declare const global: typeof globalThis & {
  dbPool?: mysql.Pool;
};

let pool: mysql.Pool | null = null;

function getPool() {
  // First, check if the pool is already cached on the global object
  if (global.dbPool) {
    return global.dbPool;
  }

  // If not, check if it's initialized in the current module scope
  if (pool) {
    return pool;
  }

  // If no credentials, return null. This allows for DB-less development.
  if (
    !process.env.DB_HOST ||
    !process.env.DB_USER ||
    !process.env.DB_PASSWORD ||
    !process.env.DB_NAME
  ) {
    console.warn("Database credentials are not set. Running without a database connection.");
    return null;
  }

  const newPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // In a production environment, cache the pool on the global object.
  // In development, the `global` object is not cleared on hot reloads,
  // preventing new pools from being created on every file change.
  if (process.env.NODE_ENV !== 'production') {
    global.dbPool = newPool;
  }
  
  pool = newPool;

  return pool;
}

// Export the initialized pool.
const db = getPool();
export default db;
