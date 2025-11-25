import Role from "@/models/Role";

export async function generateRoleId(school_id: string) {
  const year = new Date().getFullYear();

  const count = await Role.countDocuments({ school_id });

  return `role/${year}/${school_id}/${count + 1}`;
}
