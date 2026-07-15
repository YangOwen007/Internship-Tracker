import { compare } from "bcryptjs";
import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import {
  consumeRateLimit,
  getClientIpFromHeaders,
} from "@/lib/security";
import { getUserAccountByEmail } from "@/lib/user-account-store";

const credentialsSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8).max(72),
});

if (process.env.NODE_ENV === "production" && !process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET must be set in production.");
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  pages: {
    signIn: "/login",
  },
  useSecureCookies: process.env.NODE_ENV === "production",
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(rawCredentials, rawRequest) {
        const attemptedEmail = String(rawCredentials?.email ?? "")
          .trim()
          .toLowerCase();
        const clientIp = getClientIpFromHeaders(rawRequest?.headers);
        const loginRateLimit = consumeRateLimit(
          `auth:login:${clientIp}:${attemptedEmail || "unknown"}`,
          {
            limit: 5,
            windowMs: 10 * 60 * 1000,
          },
        );

        // A small server-side throttle reduces the value of brute-force login
        // attempts even before a dedicated shared rate-limiter exists.
        if (!loginRateLimit.allowed) {
          return null;
        }

        // We validate credentials up front so the auth flow fails predictably
        // instead of depending on downstream null checks.
        const parsedCredentials = credentialsSchema.safeParse(rawCredentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const user = await getUserAccountByEmail(
          parsedCredentials.data.email,
        );

        if (!user?.passwordHash) {
          return null;
        }

        const isValidPassword = await compare(
          parsedCredentials.data.password,
          user.passwordHash,
        );

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    // JWT storage keeps auth lightweight here because we only need a signed
    // session cookie, not a separate session table.
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      return session;
    },
  },
};
