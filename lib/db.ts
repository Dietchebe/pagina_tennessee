import Database from 'better-sqlite3';
import path from 'path';

// Define the database path
const dbPath = path.join(process.cwd(), 'bookings.sqlite');

// Initialize the database
const db = new Database(dbPath);

// Create the tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    barber TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    status TEXT DEFAULT 'confirmed',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db;
