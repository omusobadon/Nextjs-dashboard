<<<<<<< HEAD
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
=======
import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
>>>>>>> test
      }
      return true;
    },
  },
<<<<<<< HEAD
  providers: [
    CredentialsProvider({
      async authorize(credentials) {

        const username = "admin";

        return credentials.username === username && credentials.password === "admin123"
          ? { id: "userId", username }
          : null;
      },
    }),
  ],
   // Add providers with an empty array for now
} as NextAuthConfig;
=======
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
>>>>>>> test
