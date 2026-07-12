import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// NextAuth exposes GET and POST handlers so the App Router can serve the
// built-in sign-in, callback, and session endpoints from one place.
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
