import { getSession } from "@/lib/auth";
import User from "@/models/User";
import React from "react";
import Users from "@/components/Users/Users";
import { UsersType } from "@/types/UsersType";

const page = async () => {
  const session = await getSession();
  if (session) {
    const schoolId = session.school_id;
    const usersRaw = await User.find({ school_id: schoolId }).lean();
    const users: UsersType[] = usersRaw.map((u: any) => ({
    ...u,
    _id: u._id.toString(),
    created_at: u.created_at?.toISOString(),
    updated_at: u.updated_at?.toISOString(),
  }));
    return <Users users = {users} />;
  } else {
    return <div>Please sign in to view this page.</div>;
  }
};

export default page;
