import { getSession } from "@/lib/auth";
import User from "@/models/User";
import React from "react";
import Users from "@/components/Users/Users";
import { SideMenuType } from "@/types/SideMenues";
import Roles from "@/components/Users/Roles/Roles";
import SideMenu from "@/models/SideMenu";
import Role from "@/models/Role";
import Staff from "@/components/Staff/Staff";

const page = async () => {
  const session = await getSession();
  if (session) {
    const schoolId = session.school_id;

    /** -----------------------------
   *  FETCH SIDE MENUS
   * ----------------------------- */

    const sideMenuRaw = await SideMenu.find({ school_id: schoolId }).lean();
    const sideMenus: SideMenuType[] = sideMenuRaw.map((u: any) => ({
    ...u,
    _id: u._id.toString(),
    created_at: u.created_at?.toISOString(),
    updated_at: u.updated_at?.toISOString(),
  }));


  /** -----------------------------
   *  FETCH ROLES
   * ----------------------------- */
  const rolesRaw = await Role.find({ school_id: schoolId }).lean();
  console.log('rolesRaw',rolesRaw);
  const roles = rolesRaw.map((r: any) => ({
    ...r,
    _id: r._id.toString(),
    created_at: r.created_at?.toISOString(),
    updated_at: r.updated_at?.toISOString(),
  }));


    return <Staff sideMenus = {sideMenus}  roles = {roles} />;
  } else {
    return <div>Please sign in to view this page.</div>;
  }
};

export default page;
