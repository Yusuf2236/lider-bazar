import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getYesPosProducts, YesPosProduct } from "@/lib/yespos";

export const dynamic = 'force-dynamic';

function corsHeaders() {
    return {
        'Access-Control-Allow-Origin': '*', // Or specific allowed origin like 'http://localhost:3001'
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
}

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST() {
    try {
        console.log("[SYNC_PRODUCTS] Starting sync...");
        const products = await getYesPosProducts();

        if (products.length === 0) {
            return NextResponse.json(
                { message: "No products found in YesPos or failed to fetch." },
                { status: 404, headers: corsHeaders() }
            );
        }

        console.log(`[SYNC_PRODUCTS] Fetched ${products.length} products.`);

        // Ensure default category exists
        let category = await prisma.category.findFirst({
            where: { name: "YesPos Import" }
        });

        if (!category) {
            category = await prisma.category.create({
                data: {
                    name: "YesPos Import",
                    slug: "yespos-import",
                    image: "/placeholder.png" // We might need a placeholder image
                }
            });
        }

        let updatedCount = 0;
        let createdCount = 0;

        for (const item of products) {
            // YesPos ID is a number, our Product ID is a String (CUID).
            // Match by name for now.
            const existingProduct = await prisma.product.findFirst({
                where: { name: item.name }
            });

            if (existingProduct) {
                await prisma.product.update({
                    where: { id: existingProduct.id },
                    data: {
                        price: item.price,
                        image: item.image || existingProduct.image
                    }
                });
                updatedCount++;
            } else {
                await prisma.product.create({
                    data: {
                        name: item.name,
                        price: item.price,
                        image: item.image || "/placeholder.png",
                        categoryId: category.id,
                        description: "Imported from YesPos",
                        specs: JSON.stringify({ yespos_id: item.product_id }), // Store external ID in specs
                        stock: 100 // Default stock
                    }
                });
                createdCount++;
            }
        }

        return NextResponse.json({
            success: true,
            message: `Synced ${products.length} products. Created: ${createdCount}, Updated: ${updatedCount}`
        }, { headers: corsHeaders() });

    } catch (error: any) {
        console.error("[SYNC_PRODUCTS_ERROR]", error);
        return new NextResponse(`Sync failed: ${error.message}`, { status: 500, headers: corsHeaders() });
    }
}
