import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import School from "@/models/School";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  await connectDB();
  const { userName, password, schoolCode } = await req.json();
  const SECRET = process.env.JWT_SECRET!;

  // Validate school
  const school = await School.findOne({ school_id: schoolCode });
  if (!school) {
    return NextResponse.json({ error: "Invalid School Code" }, { status: 400 });
  }

  // Validate user inside that school
  const user = await User.findOne({ username: userName, school_id: school.school_id });
  if (!user) {
    return NextResponse.json({ error: "User not found in this school" }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: "Incorrect Password" }, { status: 401 });
  }

  // Create Token with school isolation
  const token = jwt.sign(
    {
      user_id: user._id,
      school_id: school.school_id,
      role: user.role,
      name: user.name,
    },
    SECRET,
    { expiresIn: "7d" }
  );

  const res = NextResponse.json({ message: "Login Successful" });

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
