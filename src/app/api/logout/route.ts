import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true, logout: true });

  // Clear cookie by setting an expired date
  res.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res;
}