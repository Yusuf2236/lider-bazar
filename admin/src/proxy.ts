import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized: ({ req, token }) => {
            // Check if user has token and is ADMIN
            if (req.nextUrl.pathname.startsWith("/login")) {
                return true;
            }
            return !!token && token.role === "ADMIN";
        },
    },
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
};
