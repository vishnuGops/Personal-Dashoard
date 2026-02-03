import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const authSecret = process.env.AUTH_SECRET;

if (!googleClientId || !googleClientSecret) {
  throw new Error("Missing GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET");
}
if (!authSecret) {
  throw new Error("Missing NEXTAUTH_SECRET");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
        clientId: googleClientId,
        clientSecret: googleClientSecret,
    }),
  ],
  pages: {
    signIn: '/', // We will handle sign in via modal on home page, or redirect to home to show modal
  },
  secret: authSecret,
})
