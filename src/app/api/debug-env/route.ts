import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    return NextResponse.json({
        hasGoogleId: !!(process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_ID),
        envKeys: Object.keys(process.env).filter(k =>
            k.includes('GOOGLE') || k.includes('AUTH') || k.includes('POSTGRES') || k.includes('DATABASE')
        ),
        reportedGoogleKeys: Object.keys(process.env).filter(k => k.includes('GOOGLE')),
        nextAuthUrl: process.env.NEXTAUTH_URL || "not set",
        nodeEnv: process.env.NODE_ENV,
    });
}
