const db = require("../db");

exports.createOrder = async (req, res) => {
    try {
        const {
            customer_name,
            phone,
            address,
            lat,
            lng,
            total_price,
            payment_type
        } = req.body;

        const result = await db.query(
            `INSERT INTO orders
       (customer_name, phone, address, lat, lng, total_price, payment_type, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,'NEW')
       RETURNING *`,
            [customer_name, phone, address, lat, lng, total_price, payment_type]
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM orders ORDER BY id DESC");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.assignCourier = async (req, res) => {
    try {
        const { courier_id } = req.body;
        const { id } = req.params;

        await db.query(
            "UPDATE orders SET courier_id=$1, status='ASSIGNED' WHERE id=$2",
            [courier_id, id]
        );

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        // Validate status?
        await db.query(
            "UPDATE orders SET status=$1 WHERE id=$2",
            [status, id]
        );

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
