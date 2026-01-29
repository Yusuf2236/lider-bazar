import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        console.log("[YESPOS_CALLBACK] Received callback at /api/integration/yes-pos");
        const body = await req.json();
        console.log("[YESPOS_CALLBACK] Payload:", body);

        // Expected Payload: { order_id, status }
        // status: Paid, Cancelled
        const { order_id, status } = body;

        if (!order_id || !status) {
            return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
        }

        let dbStatus = "PENDING";
        if (status.toLowerCase() === 'paid') dbStatus = "PAID";
        else if (status.toLowerCase() === 'cancelled') dbStatus = "CANCELLED";
        else dbStatus = status.toUpperCase();

        await prisma.order.update({
            where: { id: order_id },
            data: { status: dbStatus }
        });

        console.log(`[YESPOS_CALLBACK] Order ${order_id} updated to ${dbStatus}`);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[YESPOS_CALLBACK_ERROR]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
