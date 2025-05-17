import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
      },
    },
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        sameSite: "none",
        secure: true,
        path: "/",
      },
    },
    csrfToken: {
      name: `__Host-next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
      },
    },
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedRoutes = ["/dashboard", "/onboarding"];

      if (protectedRoutes.some((path) => nextUrl.pathname.startsWith(path))) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/login", nextUrl));
      }

      if (
        isLoggedIn &&
        (nextUrl.pathname === "/login" || nextUrl.pathname === "/")
      ) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
