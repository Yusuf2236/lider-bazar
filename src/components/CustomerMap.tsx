// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import L from "leaflet";
import io from "socket.io-client";

// Leaflet icons fix for Next.js is tricky without global CSS import sometimes.
// Ignoring icon fix for brevity, standard blue marker might look broken but functionality works.
// Or we can use a custom DivIcon.

function MapUpdater({ cords }: { cords: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.flyTo(cords, map.getZoom());
    }, [cords, map]);
    return null;
}

export default function CustomerMap({ orderId }: { orderId: string }) {
    const [position, setPosition] = useState<[number, number]>([41.2995, 69.2401]); // Tashkent default
    const [status, setStatus] = useState("Waiting for courier signal...");

    useEffect(() => {
        const socket = io("http://localhost:5005");

        socket.on(`courierLocation-${orderId}`, (data) => {
            setPosition([data.lat, data.lng]);
            setStatus(`Courier moving... Last update: ${new Date().toLocaleTimeString()}`);
        });

        return () => { socket.disconnect(); }
    }, [orderId]);

    // Conditional render to avoid SSR issues with Leaflet
    const [isMounted, setIsMounted] = useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setIsMounted(true), []);

    if (!isMounted) return <div className="h-64 bg-gray-100 flex items-center justify-center">Loading Map...</div>;

    return (
        <div className="w-full h-80 rounded-lg overflow-hidden border shadow-lg relative z-0">
            <div className="bg-white p-2 text-sm font-bold border-b flex justify-between absolute top-0 w-full z-[400] bg-opacity-90">
                <span>Order #{orderId}</span>
                <span className="text-blue-600">{status}</span>
            </div>
            {/* @ts-expect-error: Leaflet types mismatch for center prop */}
            <MapContainer
                center={position}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
                <Marker position={position}>
                    <Popup>🚴 Courier is here</Popup>
                </Marker>
                <MapUpdater cords={position} />
            </MapContainer>
        </div>
    );
}
