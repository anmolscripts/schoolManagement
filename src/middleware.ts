import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl;

  // If user is not logged in & tries to access dashboard
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  return NextResponse.next();
}

// ✅ MUST match both /dashboard and nested routes
export const config = {
  matcher: [
    "/dashboard",        // root dashboard route
    "/dashboard/:path*", // any nested dashboard route
  ],
};
