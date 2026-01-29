const ExcelJS = require("exceljs");
const db = require("../db");

exports.getExcelReport = async (req, res) => {
    try {
        const { courierId } = req.query;

        let query = "SELECT * FROM courier_daily_cash";
        let params = [];
        if (courierId) {
            query += " WHERE courier_id = $1";
            params.push(courierId);
        }
        query += " ORDER BY date DESC";

        const rows = await db.query(query, params);

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Kassa Hisoboti");

        sheet.columns = [
            { header: "ID", key: "id", width: 10 },
            { header: "Sana", key: "date", width: 15 },
            { header: "Kuryer ID", key: "courier_id", width: 10 },
            { header: "Buyurtmalar", key: "orders_count", width: 15 },
            { header: "Kutilgan", key: "cash_expected", width: 15 },
            { header: "Berilgan", key: "cash_given", width: 15 },
            { header: "Farq", key: "difference", width: 15 },
            { header: "Yopilgan vaqti", key: "closed_at", width: 20 },
        ];

        // Format rows
        const data = rows.rows.map(r => ({
            ...r,
            date: r.date.toISOString().split('T')[0],
            closed_at: r.closed_at ? r.closed_at.toLocaleString() : ''
        }));

        sheet.addRows(data);

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=report.xlsx");

        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}
