import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { apiHandler } from "@/lib/api-handler";

export const dynamic = 'force-dynamic';

export const GET = apiHandler(async (req: Request) => {
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
            contains: query,
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
});

export const POST = apiHandler(async (req: Request) => {
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
});
