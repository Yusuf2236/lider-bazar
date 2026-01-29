import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

console.log("🛠 [NextAuth Debug] Google Client ID exists:", !!process.env.GOOGLE_CLIENT_ID);
console.log("🛠 [NextAuth Debug] NextAuth URL:", process.env.NEXTAUTH_URL);

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
