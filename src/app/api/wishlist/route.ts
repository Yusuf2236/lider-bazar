import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiHandler } from "@/lib/api-handler";

export const dynamic = 'force-dynamic';

export const GET = apiHandler(async (req: Request) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const wishlist = await (prisma as any).wishlist.findMany({
        where: {
            userId: (session.user as any).id
        },
        include: {
            product: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return NextResponse.json(wishlist);
});

export const POST = apiHandler(async (req: Request) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { productId } = await req.json();

    if (!productId) {
        return new NextResponse("Product ID required", { status: 400 });
    }

    const userId = (session.user as any).id;

    // Check if already in wishlist
    const existing = await (prisma as any).wishlist.findUnique({
        where: {
            userId_productId: {
                userId,
                productId
            }
        }
    });

    if (existing) {
        return new NextResponse("Already in wishlist", { status: 409 });
    }

    const wishlist = await (prisma as any).wishlist.create({
        data: {
            userId,
            productId
        }
    });

    return NextResponse.json(wishlist);
});

export const DELETE = apiHandler(async (req: Request) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
        return new NextResponse("Product ID required", { status: 400 });
    }

    const userId = (session.user as any).id;

    const count = await (prisma as any).wishlist.deleteMany({
        where: {
            userId,
            productId
        }
    });

    return new NextResponse("Deleted", { status: 200 });
});
