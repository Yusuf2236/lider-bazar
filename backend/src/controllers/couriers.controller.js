const db = require("../db");

exports.createCourier = async (req, res) => {
    try {
        const { name, phone } = req.body;
        const result = await db.query(
            "INSERT INTO couriers(name, phone) VALUES($1,$2) RETURNING *",
            [name, phone]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCouriers = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM couriers WHERE active=true ORDER BY id ASC");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
