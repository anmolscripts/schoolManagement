import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import School from "@/models/School";

export async function POST(req: Request) {
  await connectDB();
  const { schoolCode } = await req.json();
  console.log("School Code Received:", schoolCode);

  // Validate school
  const school = await School.findOne({ school_id: schoolCode });
  if (!school) {
    return NextResponse.json({ error: "Invalid School Code" }, { status: 400 });
  } else {
    return NextResponse.json({ message: 'testing' }, { status: 200 });
  }

  
}
