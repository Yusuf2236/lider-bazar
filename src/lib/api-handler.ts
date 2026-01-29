import { NextResponse } from "next/server";

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, API-Key, api-key',
};

type ApiHandlerFunction = (req: Request, ...args: any[]) => Promise<NextResponse>;

export function apiHandler(handler: ApiHandlerFunction): ApiHandlerFunction {
    return async (req: Request, ...args: any[]) => {
        const MAX_RETRIES = 2;
        let attempt = 0;

        while (attempt <= MAX_RETRIES) {
            try {
                return await handler(req, ...args);
            } catch (error: any) {
                attempt++;

                // Log the failure attempt
                console.error(`🛡️ [Anti-Bug Shield] Attempt ${attempt} failed:`, error.message);

                // If we have retries left, wait and try again (Self-Healing)
                if (attempt <= MAX_RETRIES) {
                    console.log(`🩹 [Self-Healing] Retrying operation in ${attempt * 500}ms...`);
                    await new Promise(resolve => setTimeout(resolve, attempt * 500));
                    continue;
                }

                // --- Final Failure Logic (same as before) ---
                console.error("❌ [Anti-Bug Shield] All attempts failed. Returning error.");

                // 1. Log the full error details for debugging
                console.error("🛡️ [Anti-Bug Shield] Caught API Error:", {
                    url: req.url,
                    method: req.method,
                    error: error.message,
                    stack: error.stack,
                });

                // 2. Identify known errors (like Prisma validation, Auth, etc)
                const isPrismaError = error.code && error.code.startsWith('P');

                // 3. Return a user-friendly response, preventing a crash
                if (isPrismaError) {
                    return NextResponse.json({
                        error: "Database operation failed",
                        code: "DB_ERROR",
                        details: process.env.NODE_ENV === 'development' ? error.message : undefined
                    }, { status: 400, headers: CORS_HEADERS });
                }

                return NextResponse.json({
                    error: "Internal Server Error",
                    code: "SERVER_ERROR",
                    details: process.env.NODE_ENV === 'development' ? error.message : undefined
                }, { status: 500, headers: CORS_HEADERS });
            }
        }
        // Should be unreachable due to while loop logic, but typescript needs return
        return new NextResponse("Unknown Error", { status: 500 });
    };
}
