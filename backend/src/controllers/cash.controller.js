const db = require("../db");

exports.closeCash = async (req, res) => {
    try {
        const { courierId, cashGiven } = req.body;

        // SQLite date comparison
        const orders = await db.query(
            "SELECT * FROM orders WHERE courier_id=$1 AND status='DELIVERED' AND date(created_at) = date('now')",
            [courierId]
        );

        const cashExpected = orders.rows
            .filter(o => o.payment_type === "CASH")
            .reduce((acc, o) => acc + Number(o.total_price), 0);

        const difference = Number(cashGiven) - cashExpected;

        // 2. Kassa yozuvini yaratish
        const result = await db.query(
            `INSERT INTO courier_daily_cash
       (courier_id, orders_count, cash_expected, cash_given, difference, closed_at)
       VALUES ($1,$2,$3,$4,$5,datetime('now'))
       RETURNING *`,
            [courierId, orders.rows.length, cashExpected, cashGiven, difference]
        );

        // Note: If SQLite version is old, RETURNING might return empty rows array, but logic holds.
        // If result.rows is empty, return constructed object.
        const record = result.rows[0] || {
            courier_id: courierId,
            cash_expected: cashExpected,
            difference: difference
        };

        res.json({ success: true, cashExpected, difference, record });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getDailyStats = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM courier_daily_cash ORDER BY date DESC, id DESC");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
