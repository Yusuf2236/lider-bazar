"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

interface CashRecord {
    id?: number;
    courierId: number;
    cashGiven: number;
    difference: number;
    ordersCount?: number;
    cash_expected?: number;
    courier_id?: number;
    cash_given?: number;
    date?: string;
    orders_count?: number;
    closed_at?: string;
}

export default function AdminCashPage() {
    const [stats, setStats] = useState<CashRecord[]>([]);
    const [liveUpdates, setLiveUpdates] = useState<any[]>([]);

    useEffect(() => {
        // Fetch historical stats
        fetch("http://localhost:5000/api/cash")
            .then(r => r.json())
            .then(setStats)
            .catch(console.error);

        // Socket updates
        const socket = io("http://localhost:5000");
        socket.on("cashUpdate-ALL", (data: any) => {
            setLiveUpdates(prev => [data, ...prev]);
            // Refresh stats
            fetch("http://localhost:5000/api/cash")
                .then(r => r.json())
                .then(setStats);
        });

        return () => { socket.disconnect(); }
    }, []);

    const downloadReport = () => {
        window.open("http://localhost:5000/api/reports/excel", "_blank");
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">💰 Cash Control</h1>
                <button onClick={downloadReport} className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition">
                    📥 Download Excel Report
                </button>
            </div>

            {liveUpdates.length > 0 && (
                <div className="mb-6 bg-yellow-50 border border-yellow-200 p-4 rounded animate-pulse">
                    <h3 className="font-bold text-yellow-800 mb-2">⚡ Recent Updates</h3>
                    <ul>
                        {liveUpdates.map((u, i) => (
                            <li key={i} className="text-sm border-b border-yellow-200 py-1">
                                Courier {u.courierId}: Closed with {u.cashGiven} sum.
                                Difference: <span className={u.difference !== 0 ? "text-red-600 font-bold" : "text-green-600 font-bold"}>{u.difference}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="bg-white shadow rounded overflow-hidden border">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="p-3">ID</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Courier ID</th>
                            <th className="p-3">Orders</th>
                            <th className="p-3">Expected</th>
                            <th className="p-3">Given</th>
                            <th className="p-3">Difference</th>
                            <th className="p-3">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.map((row) => (
                            <tr key={row.id} className="border-b hover:bg-gray-50 transition">
                                <td className="p-3">{row.id}</td>
                                <td className="p-3">{row.date ? String(row.date).split('T')[0] : ''}</td>
                                <td className="p-3 font-bold">{row.courier_id}</td>
                                <td className="p-3">{row.orders_count}</td>
                                <td className="p-3">{row.cash_expected?.toLocaleString()}</td>
                                <td className="p-3 font-bold text-blue-600">{row.cash_given?.toLocaleString()}</td>
                                <td className={`p-3 font-bold ${row.difference != 0 ? 'text-red-500' : 'text-green-500'}`}>
                                    {row.difference?.toLocaleString()}
                                </td>
                                <td className="p-3 text-gray-500 text-sm">{row.closed_at ? new Date(row.closed_at).toLocaleTimeString() : ''}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {stats.length === 0 && <div className="p-4 text-center text-gray-400">No records found</div>}
            </div>

            <div className="mt-8 p-4 bg-gray-50 text-sm text-gray-500 rounded">
                <p>💡 Tip: Courier must click "Close Kassa" in their app for records to appear here.</p>
            </div>
        </div>
    );
}
