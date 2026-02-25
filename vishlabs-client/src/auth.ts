import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const authSecret = process.env.AUTH_SECRET;

if (!googleClientId || !googleClientSecret) {
  throw new Error("Missing GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET");
}
if (!authSecret) {
  throw new Error("Missing AUTH_SECRET");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  pages: {
    signIn: "/",
  },
  secret: authSecret,
  callbacks: {
    async signIn({ user, account }) {
      try {
        await prisma.authLog.create({
          data: {
            userId: user.id ?? null,
            action: "SIGN_IN",
            metadata: JSON.stringify({
              provider: account?.provider ?? "unknown",
              email: user.email,
            }),
          },
        })
      } catch {
        // Non-fatal: don't block sign-in if logging fails
      }
      return true
    },
    async jwt({ token, user }) {
      if (user?.id) {
        // First time JWT is created (sign-in) — fetch role from DB
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true },
        })
        token.id = user.id
        token.role = dbUser?.role ?? "USER"
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
})
