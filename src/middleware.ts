import NextAuth from 'next-auth';
<<<<<<< HEAD
import { authConfig } from "./auth.config"

export const { auth: middleware } = NextAuth(authConfig)
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
=======
export { auth as default } from "./auth"
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
>>>>>>> test
};