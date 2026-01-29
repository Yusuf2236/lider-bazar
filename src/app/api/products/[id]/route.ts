import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { apiHandler } from "@/lib/api-handler";

export const dynamic = 'force-dynamic';

export const GET = apiHandler(async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const product = await (prisma as any).product.findUnique({
        where: { id },
        include: {
            reviews: {
                include: { user: { select: { name: true, image: true } } },
                orderBy: { createdAt: 'desc' }
            },
            category: true
        }
    });

    if (!product) {
        return new NextResponse("Product not found", { status: 404 });
    }

    return NextResponse.json(product);
});
