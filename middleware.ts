import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Determine if it is the blog subdomain (e.g. blog.bhawukarora.app or blog.localhost:3000)
  const isBlogSubdomain = hostname.startsWith('blog.');

  if (isBlogSubdomain) {
    // If the path starts with /blog, redirect to root of subdomain
    if (url.pathname.startsWith('/blog')) {
      const newPathname = url.pathname.replace(/^\/blog/, '');
      url.pathname = newPathname === '' ? '/' : newPathname;
      return NextResponse.redirect(url);
    }

    // Rewrite blog.bhawukarora.app/ to /blog internally, and blog.bhawukarora.app/slug to /blog/slug
    url.pathname = `/blog${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Redirect /blog to blog subdomain ONLY in production
  const isDev = process.env.NODE_ENV === 'development';
  if (!isDev) {
    if (url.pathname === '/blog') {
      return NextResponse.redirect(new URL('https://blog.bhawukarora.app/', req.url));
    }
    if (url.pathname.startsWith('/blog/')) {
      const slug = url.pathname.substring(6); // remove '/blog/'
      return NextResponse.redirect(new URL(`https://blog.bhawukarora.app/${slug}`, req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in query parameters
    '/((?!_next|[^?]*\\.[^?]*$).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
