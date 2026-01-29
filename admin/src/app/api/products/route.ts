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

        // ... GET handler existing ...
        return NextResponse.json(formattedProducts);
    } catch (error) {
        console.error("[ADMIN_PRODUCTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, price, categoryName, description, image, stock } = body;

        // Simple validation
        if (!name || !price) {
            return new NextResponse("Name and Price are required", { status: 400 });
        }

        // Find or create category
        // In a real app, you'd likely select from existing categories, but this is a quick fix
        let category = await prisma.category.findFirst({
            where: { name: categoryName || "General" }
        });

        if (!category) {
            category = await prisma.category.create({
                data: {
                    name: categoryName || "General",
                    slug: (categoryName || "General").toLowerCase().replace(/\s+/g, '-'),
                    image: "/placeholder.png"
                }
            });
        }

        const product = await prisma.product.create({
            data: {
                name,
                price: Number(price),
                description: description || "",
                image: image || "/placeholder.png",
                stock: Number(stock) || 0,
                categoryId: category.id,
                isNew: true
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("[ADMIN_PRODUCTS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
