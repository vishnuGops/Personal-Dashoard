import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "dummy-id",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "dummy-secret"
    }),
    Credentials({
      name: "Demo User",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "demo" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Mock user for demo purposes
        if (credentials?.username === "demo" && credentials?.password === "demo") {
          return { id: "1", name: "Demo User", email: "demo@example.com", image: "https://github.com/shadcn.png" }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/', // We will handle sign in via modal on home page, or redirect to home to show modal
  },
  secret: process.env.NEXTAUTH_SECRET ?? "very-secret-key-that-should-be-in-env",
})
