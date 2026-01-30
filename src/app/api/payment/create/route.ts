import { NextResponse } from "next/server";
import { yesPosClient } from "@/lib/yespos";
import { apiHandler } from "@/lib/api-handler";

export const POST = apiHandler(async (req: Request) => {
    const { amount, order_id } = await req.json();

    if (!amount || !order_id) {
        return new NextResponse("Missing required fields", { status: 400 });
    }

    // Payment integration pending specific API documentation for Payment Gateway URL generation.
    // Currently YesPosClient only supports Order Synchronization (Marketplace).

    return NextResponse.json({
        url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/checkout?error=PaymentNotImplemented`
    });
});
