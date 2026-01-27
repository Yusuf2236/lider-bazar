import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Product, Category } from "@prisma/client";

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
        const formattedProducts = products.map((product: Product & { category: Category | null }) => ({
            id: product.id,
            name: product.name,
            category: product.category?.name || 'Uncategorized',
            price: product.price,
            stock: product.stock,
            status: product.stock > 0 ? 'InStock' : 'OutOfStock',
            image: product.image
        }));

        return NextResponse.json(formattedProducts);
    } catch (error) {
        console.error("[ADMIN_PRODUCTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
