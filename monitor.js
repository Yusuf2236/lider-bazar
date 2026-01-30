const axios = require('axios');
const readline = require('readline');

const SERVICES = [
    { name: "🏠 WEBSITE (Mijoz)", url: "http://localhost:3005", type: "frontend" },
    { name: "🛠  ADMIN PANEL", url: "http://localhost:3005/admin", type: "frontend" },
    { name: "🚚 COURIER APP", url: "http://localhost:3005/courier", type: "frontend" },
    { name: "⚙️  BACKEND API", url: "http://localhost:5005/api/couriers", type: "backend" }
];

async function checkService(service) {
    const start = Date.now();
    try {
        await axios.get(service.url, { timeout: 2000 });
        const latency = Date.now() - start;
        return { status: true, latency };
    } catch (e) {
        return { status: false, error: e.message };
    }
}

function clearScreen() {
    console.clear();
}

function printBox(header, content, color) {
    const width = 60;
    const border = "─".repeat(width);
    console.log(`\x1b[1m${header}\x1b[0m`);
    console.log(`┌${border}┐`);
    content.forEach(line => {
        console.log(`│ ${line.padEnd(width - 2)} │`);
    });
    console.log(`└${border}┘`);
}

async function updateDashboard() {
    const statuses = await Promise.all(SERVICES.map(async s => {
        const result = await checkService(s);
        return { ...s, ...result };
    }));

    clearScreen();
    const timestamp = new Date().toLocaleTimeString();
    console.log(`\n    📊 LIDER BAZAR SYSTEM MONITOR    🕒 ${timestamp}\n`);

    const lines = statuses.map(s => {
        const icon = s.status ? "🟢 " : "🔴 ";
        const statusText = s.status ? "\x1b[32mACTIVE\x1b[0m" : "\x1b[31mOFFLINE\x1b[0m";
        const latencyText = s.status ? `(${s.latency}ms)` : "";

        let line = `${icon} ${s.name.padEnd(25)} [${statusText}] ${latencyText}`;
        return line;
    });

    // Formatting for simple view
    statuses.forEach(s => {
        const statusColor = s.status ? "\x1b[32m" : "\x1b[31m";
        const reset = "\x1b[0m";
        const icon = s.status ? "✓" : "✗";

        console.log(`${statusColor} ${icon} ${s.name.padEnd(20)} ${s.status ? "ONLINE" : "OFFLINE"} \t${s.status ? s.latency + "ms" : ""} ${reset}`);
    });

    console.log("\nActual Ports:");
    console.log("Frontend: :3005");
    console.log("Backend:  :5005");
    console.log("\n(Ctrl+C to stop)");
}

setInterval(updateDashboard, 2000);
updateDashboard();
