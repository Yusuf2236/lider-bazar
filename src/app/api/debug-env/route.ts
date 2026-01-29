import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    return NextResponse.json({
        hasGoogleId: !!process.env.GOOGLE_CLIENT_ID,
        googleIdPrefix: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID.substring(0, 10) + "..." : "missing",
        hasGoogleSecret: !!process.env.GOOGLE_CLIENT_SECRET,
        nextAuthUrl: process.env.NEXTAUTH_URL || "not set",
        nodeEnv: process.env.NODE_ENV,
    });
}
