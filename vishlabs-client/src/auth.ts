import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const authSecret = process.env.AUTH_SECRET;
const enableDemoAuth = process.env.DEMO_AUTH_ENABLED === "true";

if (!googleClientId || !googleClientSecret) {
  throw new Error("Missing GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET");
}
if (!authSecret) {
  throw new Error("Missing NEXTAUTH_SECRET");
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "dummy-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "dummy-secret"
    }),
    ...(enableDemoAuth
      ? [
          Credentials({
            name: "Demo User",
            credentials: {
              username: { label: "Username", type: "text", placeholder: "demo" },
              password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
              if (
                credentials?.username === "demo" &&
                credentials?.password === "demo"
              ) {
                return {
                  id: "1",
                  name: "Demo User",
                  email: "demo@example.com",
                  image: "https://github.com/shadcn.png",
                };
              }
              return null;
            },
          }),
        ]
      : []),
  ],
  pages: {
    signIn: '/', // We will handle sign in via modal on home page, or redirect to home to show modal
  },
  secret: authSecret,
})
