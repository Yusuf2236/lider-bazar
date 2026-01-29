const express = require("express");
const cors = require("cors");

const ordersRoutes = require("./routes/orders.routes");
const couriersRoutes = require("./routes/couriers.routes");
const cashRoutes = require("./routes/cash.routes");
const reportsRoutes = require("./routes/reports.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/orders", ordersRoutes);
app.use("/api/couriers", couriersRoutes);
app.use("/api/cash", cashRoutes);
app.use("/api/reports", reportsRoutes);

module.exports = app;
