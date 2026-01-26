
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
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
    } catch (error) {
        console.log("[WISHLIST_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
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
    } catch (error) {
        console.log("[WISHLIST_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
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
    } catch (error) {
        console.log("[WISHLIST_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
