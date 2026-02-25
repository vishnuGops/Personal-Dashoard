import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    providers: [],
    pages: {
        signIn: "/",
    },
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string
                if (token.role) {
                    session.user.role = token.role as string
                }
            }
            return session
        },
    },
} satisfies NextAuthConfig
