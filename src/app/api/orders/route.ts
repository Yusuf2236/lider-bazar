import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sendTelegramMessage } from "@/lib/telegram";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
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
    } catch (error) {
        console.log("[ORDERS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { items, total, address, phone, location, paymentMethod } = body;

        if (!items || items.length === 0) {
            return new NextResponse("No items in order", { status: 400 });
        }

        const order: any = await (prisma as any).order.create({
            data: {
                userId: (session.user as any).id,
                total: Math.round(total),
                address,
                phone,
                location,
                paymentMethod: paymentMethod || 'cash',
                status: 'PENDING',
                items: {
                    create: items.map((item: any) => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: Math.round(item.price)
                    }))
                }
            },
            include: {
                user: { select: { name: true, email: true } }
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

        return NextResponse.json(order);
    } catch (error: any) {
        console.error("[ORDERS_POST_ERROR]", error);
        // Include error message for debugging
        return new NextResponse(`Order creation failed: ${error.message || 'Unknown error'}`, { status: 500 });
    }
}
