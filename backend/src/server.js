const http = require("http");
const app = require("./app");
const pool = require("./db");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    console.log("🔌 New client connected");

    // Dastavkachi lokatsiyasini qabul qilish
    socket.on("courierLocation", async (data) => {
        // data: { courierId, lat, lng, orderId }
        // Broadcast to customer (if orderId provided)
        if (data.orderId) {
            io.emit(`courierLocation-${data.orderId}`, data);
        }

        // Save to DB (upsert)
        if (data.courierId) {
            try {
                // SQLite upsert
                await pool.query(
                    `INSERT INTO courier_locations (courier_id, lat, lng, updated_at)
                 VALUES ($1, $2, $3, datetime('now'))
                 ON CONFLICT (courier_id) 
                 DO UPDATE SET lat = excluded.lat, lng = excluded.lng, updated_at = datetime('now')`,
                    [data.courierId, data.lat, data.lng]
                );
            } catch (e) {
                console.error("Error saving location", e);
            }
        }
    });

    // Real-time cash update
    socket.on("cashUpdate", (data) => {
        // data: { courierId, cashGiven, difference }
        io.emit(`cashUpdate-ALL`, data);
    });

    // Status update
    socket.on("statusUpdate", (data) => {
        io.emit(`orderStatus-${data.orderId}`, data);
    })

    socket.on("disconnect", () => {
        console.log("❌ Client disconnected");
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Backend running on port ${PORT}`);
});
