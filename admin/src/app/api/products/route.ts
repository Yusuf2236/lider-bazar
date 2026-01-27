import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                category: true
            }
        });

        // Map to ensure safer/cleaner response if needed, 
        // but passing raw prisma object is fine for now.
        const formattedProducts = products.map((product) => ({
            id: product.id,
            name: product.name,
            category: product.category?.name || 'Uncategorized',
            price: product.price,
            stock: product.stock,
            status: product.stock > 0 ? 'In Stock' : 'Out of Stock',
            image: product.image
        }));

        return NextResponse.json(formattedProducts);
    } catch (error) {
        console.error("[ADMIN_PRODUCTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
