import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const host = req.headers.get("host");
        const path = req.nextUrl.pathname;

        // --- ADMIN SYSTEM (Port 3001) ---
        if (host?.includes(":3001")) {
            // If admin opens root '/', send them straight to dashboard
            if (path === "/") {
                return NextResponse.redirect(new URL("/admin", req.url));
            }
            // Optional: Block non-admin pages? For now, let them browse site too if needed.
        }

        // --- CUSTOMER SYSTEM (Port 3000) ---
        if (host?.includes(":3000")) {
            // Hide Admin Panel from customers completely
            if (path.startsWith("/admin")) {
                return NextResponse.redirect(new URL("/", req.url));
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                const path = req.nextUrl.pathname;

                // Enforce login ONLY for specific protected routes
                if (path.startsWith("/admin") || path.startsWith("/profile")) {
                    return !!token;
                }
                // Allow public access to everything else (Home, Products, etc.)
                return true;
            }
        },
        pages: {
            signIn: '/login',
        },
    }
);

// Matcher must include root '/' to capture the Port 3001 redirect
export const config = { matcher: ["/", "/admin/:path*", "/profile/:path*"] };
