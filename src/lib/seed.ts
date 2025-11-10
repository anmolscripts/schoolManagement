// src/lib/seed.ts
import School from "@/models/School";
import User from "@/models/User";
import Student from "@/models/Student";
import bcrypt from "bcryptjs";
import { log } from "console";

export async function seedInitialData() {
  const existing = await School.findOne();
  if (existing) return;

  const school = await School.create({
    school_id: "SCH-0001",
    name: "Default School",
    address: "India",
    phone: "0000",
    logo: "/logo.png",
    created_by: "system",
    updated_by: "system"
  });

  const hashed = await bcrypt.hash("admin123", 10);

  await User.create({
    school_id: school.school_id,
    name: "Super Admin",
    username: "admin",
    password: hashed,
    role: "admin",
    created_by: "system",
    updated_by: "system"
  });

  // ✅ Create sample student
  await Student.create({
    school_id: school.school_id,
    name: "John Doe",
    class: "1A",
    roll_no: 1,
    created_by: "system",
    updated_by: "system"
  });

  console.log("✅ Initial School, Admin, and Student Created");
}
