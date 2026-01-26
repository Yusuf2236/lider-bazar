
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");
        const query = searchParams.get("q");

        const where: any = {};

        if (category) {
            where.category = {
                slug: category
            };
        }

        if (query) {
            where.name = {
                contains: query, // Note: SQLite is case-sensitive by default with contains unless configured, but for MVP fit
            }
        }

        const products = await (prisma as any).product.findMany({
            where,
            include: {
                category: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(products);
    } catch (error) {
        console.log("[PRODUCTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, price, image, categoryId, description, specs } = body;

        const product = await (prisma as any).product.create({
            data: {
                name,
                price: Number(price),
                image,
                categoryId,
                description,
                specs: specs ? JSON.stringify(specs) : null,
                stock: 100
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.log("[PRODUCTS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
