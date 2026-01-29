const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Use backend.db to avoid conflicts
const dbPath = path.resolve(__dirname, "../../backend.db");
const db = new sqlite3.Database(dbPath);

console.log("Using SQLite Database at:", dbPath);

function query(text, params = []) {
    return new Promise((resolve, reject) => {
        // 1. Convert $1, $2, etc to ?
        const sql = text.replace(/\$\d+/g, "?");

        // 2. Use db.all for everything to support RETURNING
        db.all(sql, params, function (err, rows) {
            if (err) {
                // If error is about syntax, log it
                console.error("SQL Error:", err.message, "Query:", sql);
                return reject(err);
            }
            resolve({ rows: rows || [], rowCount: this.changes });
        });
    });
}

module.exports = {
    query,
    end: () => db.close()
};
