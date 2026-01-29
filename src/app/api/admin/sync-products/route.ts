import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getYesPosProducts, YesPosProduct } from "@/lib/yespos";
import { apiHandler } from "@/lib/api-handler";

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

export const POST = apiHandler(async () => {
    return NextResponse.json({
        success: true,
        message: "Sync is disabled. Products are managed locally in Admin Panel."
    }, { headers: corsHeaders() });
});
