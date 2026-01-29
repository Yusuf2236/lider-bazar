import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { apiHandler } from "@/lib/api-handler";

export const POST = apiHandler(async (req: Request) => {
    const body = await req.json();
    const { transaction_id, status, amount, order_id } = body;

    console.log(`[PAYMENT_WEBHOOK] Received update for ${transaction_id}. Status: ${status}`);

    if (status === "SUCCESS") {
        // Find order by ID (Assuming order_id passed to payment matches our DB id, or we stored it)
        // If order_id matches our DB CUID:

        // NOTE: We need to be careful matching YesPos Order ID vs Internal ID.
        // If we sent internal ID as 'order_id', we can look it up.

        // Update order status in database
        await prisma.order.update({
            where: { id: order_id },
            data: {
                status: 'COMPLETED',
                paymentMethod: 'card' // Confirmed card payment
            }
        });
        console.log(`Order ${order_id} marked as COMPLETED`);
    } else {
        console.log("Payment failed or cancelled.");
    }

    return new NextResponse("OK", { status: 200 });
});
