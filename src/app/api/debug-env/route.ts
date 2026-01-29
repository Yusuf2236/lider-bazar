import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    // Collect all keys but hide the actual values for security
    const allKeys = Object.keys(process.env);

    return NextResponse.json({
        totalKeys: allKeys.length,
        allKeys: allKeys.sort(),
        hasGoogleId: !!(process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_ID),
        nextAuthUrl: process.env.NEXTAUTH_URL || "not set",
        nodeEnv: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV || "unknown"
    });
}
