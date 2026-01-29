import { NextResponse } from "next/server";
import { createYesPosPayment } from "@/lib/yespos";
import { apiHandler } from "@/lib/api-handler";

export const POST = apiHandler(async (req: Request) => {
    const { amount, order_id } = await req.json();

    if (!amount || !order_id) {
        return new NextResponse("Missing required fields", { status: 400 });
    }

    // Ideally, we should validate order_id against our DB first.

    // Construct Webhook URL
    // In dev, localhost won't work for callbacks unless we use ngrok.
    // We'll use NEXTAUTH_URL or a specific env var.
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const callbackUrl = `${baseUrl}/api/payment/webhook`;

    const paymentData = await createYesPosPayment(amount, order_id, callbackUrl);

    return NextResponse.json(paymentData);
});
