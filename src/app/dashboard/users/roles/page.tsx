import { getSession } from "@/lib/auth";
import User from "@/models/User";
import React from "react";
import Users from "@/components/Users/Users";
import { SideMenuType } from "@/types/SideMenues";
import Roles from "@/components/Users/Roles/Roles";
import SideMenu from "@/models/SideMenu";

const page = async () => {
  const session = await getSession();
  if (session) {
    const schoolId = session.school_id;
    const sideMenuRaw = await SideMenu.find({ school_id: schoolId }).lean();
    const sideMenus: SideMenuType[] = sideMenuRaw.map((u: any) => ({
    ...u,
    _id: u._id.toString(),
    created_at: u.created_at?.toISOString(),
    updated_at: u.updated_at?.toISOString(),
  }));
    return <Roles sideMenus = {sideMenus} />;
  } else {
    return <div>Please sign in to view this page.</div>;
  }
};

export default page;
