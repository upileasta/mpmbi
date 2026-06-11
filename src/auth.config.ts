import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/admin-portal-page',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname === '/admin' || nextUrl.pathname.startsWith('/admin/');
      
      if (isOnAdmin) {
        if (isLoggedIn) return true;
        // Ultra-hidden: Redirect to home instead of login page when not authenticated
        return Response.redirect(new URL('/', nextUrl));
      } else if (isLoggedIn && nextUrl.pathname === '/admin-portal-page') {
        return Response.redirect(new URL('/admin', nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
