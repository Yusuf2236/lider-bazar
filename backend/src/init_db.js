const pool = require("./db");

async function initDb() {
    try {
        // Split queries because db.all usually does one statement? 
        // Actually sqlite3 driver handles one statement per call mostly.

        await pool.query(`
      CREATE TABLE IF NOT EXISTS couriers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phone TEXT,
        active INTEGER DEFAULT 1
      );
    `);

        await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT,
        phone TEXT,
        address TEXT,
        lat REAL,
        lng REAL,
        total_price INTEGER,
        payment_type TEXT,
        courier_id INTEGER,
        status TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

        await pool.query(`
      CREATE TABLE IF NOT EXISTS courier_locations (
        courier_id INTEGER PRIMARY KEY,
        lat REAL,
        lng REAL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

        await pool.query(`
      CREATE TABLE IF NOT EXISTS courier_daily_cash (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          courier_id INTEGER REFERENCES couriers(id),
          date DATE DEFAULT CURRENT_DATE,
          orders_count INTEGER DEFAULT 0,
          cash_expected INTEGER DEFAULT 0,
          cash_given INTEGER DEFAULT 0,
          difference INTEGER DEFAULT 0,
          closed_at DATETIME
      );
    `);
        console.log("✅ Tables created successfully (SQLite)");
    } catch (err) {
        console.error("❌ Error creating tables:", err);
    }
}

initDb();
