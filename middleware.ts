import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes
//const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/', '/bienvenida']);

export default clerkMiddleware((auth, req) => {
  // Protect routes based on the public route matcher
  //if (!isPublicRoute(req)) auth().protect();

  // Create the response and set the Content-Security-Policy header
  const res = NextResponse.next();
  res.headers.set(
    'Content-Security-Policy',
    "frame-ancestors 'self' http://localhost:3000 https://builder.io"
  );

  return res;
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
