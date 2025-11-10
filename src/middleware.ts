import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Allow all API routes to pass through, they will handle their own auth
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Routes that do NOT require auth (whitelist for pages)
  const publicPaths = [
    "/auth/sign-in",
    "/auth/sign-up",
    "/favicon.ico",
  ];

  // If route is public, allow access
  const isPublic = publicPaths.some((path) => pathname.startsWith(path));

  // If user is not logged in and the route is not public, redirect to sign-in
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to all routes except Next.js internal files
export const config = {
  matcher: [
    "/((?!_next|images|static|favicon.ico).*)",
  ],
};
