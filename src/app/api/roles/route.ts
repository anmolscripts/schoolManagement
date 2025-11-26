import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Role from "@/models/Role";
import { generateRoleId } from "@/lib/generateRoleId";

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();

  const { role_id, school_id, role_name, remark, access, role_type } = data;

  if (!school_id || !role_name) {
    return NextResponse.json(
      { error: "school_id and role_name are required" },
      { status: 400 },
    );
  }

  const normalizedAccess = Object.fromEntries(
  access.map((a) => [
    a.sideMenu_id,
    { view: a.view, update: a.update, edit: a.edit }
  ])
);

  // ========== UPDATE ROLE ==========
  if (role_id) {
    const updated = await Role.findOneAndUpdate(
      { role_id },
      {
        role_name,
        role_type, // <-- FIX 🚀
        remark,
        access: normalizedAccess,
        updated_by: "system",
        updated_at: new Date(),
      },
      { new: true },
    );

    if (!updated) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Role updated successfully", role: updated },
      { status: 200 },
    );
  }

  // ========== INSERT NEW ROLE ==========
  const existingName = await Role.findOne({ role_name, school_id });

  if (existingName) {
    return NextResponse.json(
      { error: "Role name already exists" },
      { status: 400 },
    );
  }

 

  const newRoleId = await generateRoleId(school_id);

  const role = await Role.create({
    role_id: newRoleId,
    school_id,
    role_name,
    role_type,
    remark,
    access: normalizedAccess,
    created_by: "system",
    updated_by: "system",
  });

  return NextResponse.json(
    { message: "Role created successfully", role },
    { status: 201 },
  );
}
