import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sendTelegramMessage } from "@/lib/telegram";
import { createYesPosOrder } from "@/lib/yespos";

export const dynamic = 'force-dynamic';

import { apiHandler } from "@/lib/api-handler";

export const GET = apiHandler(async (req: Request) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const user: any = session.user;
    const where: any = {};

    const dbUser = await (prisma as any).user.findUnique({ where: { id: user.id } });

    if (dbUser?.role !== 'ADMIN') {
        where.userId = user.id;
    }

    const orders = await (prisma as any).order.findMany({
        where,
        include: {
            user: {
                select: { name: true, email: true }
            },
            items: {
                include: {
                    product: { select: { name: true, image: true } }
                }
            }
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return NextResponse.json(orders);
});

export const POST = apiHandler(async (req: Request) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { items, address, phone, location, paymentMethod } = body;

    // Check if user exists in DB (handling stale sessions after DB switch)
    const dbUser = await prisma.user.findUnique({
        where: { id: (session.user as any).id }
    });

    if (!dbUser) {
        return new NextResponse("User record not found. Please log out and log in again.", { status: 401 });
    }

    if (!items || items.length === 0) {
        return new NextResponse("No items in order", { status: 400 });
    }

    // Validate products exist
    const productIds = items.map((item: any) => item.id);
    const validProducts = await prisma.product.findMany({
        where: {
            id: { in: productIds }
        },
        select: { id: true }
    });

    const validProductIds = new Set(validProducts.map((p: any) => p.id));
    const validItems = items.filter((item: any) => validProductIds.has(item.id));

    if (validItems.length === 0) {
        return new NextResponse("Selected products no longer exist", { status: 400 });
    }

    // Recalculate total based on valid items
    const total = validItems.reduce((acc: number, item: any) => {
        return acc + (item.price * item.quantity);
    }, 0);

    const order = await prisma.order.create({
        data: {
            userId: (session.user as any).id,
            total: Math.round(total),
            address,
            phone,
            location,
            paymentMethod: paymentMethod || 'cash',
            status: 'PENDING',
            items: {
                create: validItems.map((item: any) => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: Math.round(item.price)
                }))
            }
        },
        include: {
            user: { select: { name: true, email: true } },
            items: true
        }
    });

    // Send Telegram Notification
    try {
        const message = `
📦 <b>New Order Received!</b>

🆔 Order ID: #${order.id.slice(-6).toUpperCase()}
👤 Customer: ${order.user.name} (${order.user.email})
💰 Total: ${total.toLocaleString()} UZS
📞 Phone: ${phone}
📍 Address: ${address}
💳 Payment: ${order.paymentMethod === 'card' ? '💳 Card (Click/Payme)' : '💵 Cash'}

<a href="https://lider-bazar.vercel.app/admin/orders">View Order</a>
`;
        await sendTelegramMessage(message);
    } catch (tgError) {
        console.error("[TELEGRAM_ERROR]", tgError);
    }

    // Send to YesPos (Only if Card)
    let paymentResponse = null;
    if (paymentMethod === 'card') {
        try {
            // Construct return/cancel URLs dynamically if possible, or use defaults
            const protocol = req.headers.get('x-forwarded-proto') || 'http';
            const host = req.headers.get('host');
            const baseUrl = `${protocol}://${host}`;

            paymentResponse = await createYesPosOrder({
                ...order,
                return_url: `${baseUrl}/profile`,
                cancel_url: `${baseUrl}/checkout`
            });
        } catch (ypError) {
            console.error("[YESPOS_ERROR]", ypError);
            // We generally still want to return the order even if payment init failed, 
            // so the user can retry.
        }
    }

    return NextResponse.json({
        order,
        payment: paymentResponse
    });
});

