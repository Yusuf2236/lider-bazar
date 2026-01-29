"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket: any;

export default function CourierPage() {
    const [courierId, setCourierId] = useState("");
    const [orderId, setOrderId] = useState("");
    const [active, setActive] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [cash, setCash] = useState("");

    useEffect(() => {
        socket = io("http://localhost:5000");

        socket.on("connect", () => {
            addLog("Connected to server");
        });

        return () => {
            if (socket) socket.disconnect();
        }
    }, []);

    const addLog = (msg: string) => setLogs(p => [msg, ...p]);

    const startTracking = () => {
        if (!courierId) return alert("Enter Courier ID");
        setActive(true);
        addLog(`Tracking started for Courier ${courierId} (Order: ${orderId || 'None'})...`);

        if ("geolocation" in navigator) {
            navigator.geolocation.watchPosition((pos) => {
                const { latitude, longitude } = pos.coords;
                socket.emit("courierLocation", {
                    courierId: courierId,
                    orderId: orderId, // Send OrderId for tracking
                    lat: latitude,
                    lng: longitude
                });
                addLog(`Sent location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
            }, (err) => {
                addLog("Error: " + err.message);
            }, { enableHighAccuracy: true });
        } else {
            addLog("Geolocation not supported");
        }
    };

    const closeCash = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/cash/close", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ courierId, cashGiven: Number(cash) })
            });
            const data = await res.json();
            if (data.success) {
                alert(`Kassa Yopildi! Farq: ${data.difference} so'm`);
                addLog(`Kassa Closed. Difference: ${data.difference}`);
            } else {
                alert("Error: " + (data.error || "Unknown"));
            }
        } catch (e: any) {
            alert("Network Error: " + e.message);
        }
    }

    return (
        <div className="p-4 max-w-md mx-auto min-h-screen bg-white text-black">
            <h1 className="text-xl font-bold mb-4">🚴 Courier Panel</h1>

            {!active ? (
                <div className="space-y-4">
                    <input
                        className="border p-2 w-full rounded"
                        placeholder="Courier ID (e.g. 1)"
                        value={courierId}
                        onChange={e => setCourierId(e.target.value)}
                    />
                    <input
                        className="border p-2 w-full rounded"
                        placeholder="Active Order ID (e.g. 101)"
                        value={orderId}
                        onChange={e => setOrderId(e.target.value)}
                    />
                    <button
                        onClick={startTracking}
                        className="bg-blue-600 text-white w-full p-3 rounded font-bold"
                    >
                        Start Work
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="bg-green-100 p-4 rounded border border-green-300">
                        <p className="text-green-800 font-bold">🟢 You are ACTIVE</p>
                        <p className="text-sm">Location sent for Order #{orderId}</p>
                    </div>

                    <div className="border p-4 rounded bg-white shadow">
                        <h3 className="font-bold mb-2">💰 Kassa Yopish</h3>
                        <input
                            type="number"
                            className="border p-2 w-full mb-2 rounded"
                            placeholder="Naqd pul (so'm)"
                            value={cash}
                            onChange={e => setCash(e.target.value)}
                        />
                        <button
                            onClick={closeCash}
                            className="bg-gray-800 text-white w-full p-2 rounded"
                        >
                            🔒 Close Kassa
                        </button>
                    </div>

                    <div className="h-40 overflow-auto bg-gray-50 p-2 text-xs border rounded font-mono">
                        {logs.map((l, i) => <div key={i} className="border-b">{l}</div>)}
                    </div>
                </div>
            )}
        </div>
    );
}
