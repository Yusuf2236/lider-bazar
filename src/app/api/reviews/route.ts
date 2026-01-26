
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { productId, rating, comment } = body;

        if (!productId || !rating) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        // Check if user already reviewed
        const existing = await (prisma as any).review.findUnique({
            where: {
                userId_productId: {
                    userId: (session.user as any).id,
                    productId
                }
            }
        });

        if (existing) {
            return new NextResponse("Already reviewed", { status: 409 });
        }

        const review = await (prisma as any).review.create({
            data: {
                userId: (session.user as any).id,
                productId,
                rating,
                comment
            }
        });

        // Update product average rating
        const aggregates = await (prisma as any).review.aggregate({
            where: { productId },
            _avg: { rating: true }
        });

        await prisma.product.update({
            where: { id: productId },
            data: { rating: aggregates._avg.rating || 0 }
        });

        return NextResponse.json(review);
    } catch (error) {
        console.log("[REVIEWS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
