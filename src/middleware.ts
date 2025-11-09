import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Routes that do NOT require auth (whitelist)
  const publicPaths = [
    "/auth/sign-in",
    "/auth/sign-up",
    "/api/login",
    "/favicon.ico",
  ];

  // If route starts with any of the public paths → allow
  const isPublic = publicPaths.some((path) => pathname.startsWith(path));

  // If user not logged in and route is NOT public → redirect
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  return NextResponse.next();
}

// ✅ Apply middleware to all routes except Next.js internal files
export const config = {
  matcher: [
    "/((?!_next|images|static|favicon.ico).*)",
  ],
};
