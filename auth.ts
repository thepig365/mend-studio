import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const marketingPortalEmail =
  process.env.MARKETING_PORTAL_ALLOWED_EMAIL?.trim().toLowerCase() ||
  "hello@mendbeauty.com.au";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/marketing/login",
    error: "/marketing/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, profile }) {
      const email = user.email?.trim().toLowerCase();
      const emailVerified =
        typeof profile?.email_verified === "boolean"
          ? profile.email_verified
          : false;

      return email === marketingPortalEmail && emailVerified;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        token.email = user.email.trim().toLowerCase();
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && typeof token.email === "string") {
        session.user.email = token.email;
      }
      return session;
    },
  },
});

export function isMarketingAuthConfigured() {
  return Boolean(
    process.env.AUTH_SECRET &&
      process.env.AUTH_GOOGLE_ID &&
      process.env.AUTH_GOOGLE_SECRET,
  );
}
