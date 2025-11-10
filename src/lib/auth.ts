import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as {
      user_id: string;
      school_id: string;
      name: string;
      role: string;
    };
  } catch {
    return null;
  }
}
