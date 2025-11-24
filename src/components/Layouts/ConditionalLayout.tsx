import type { PropsWithChildren } from "react";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import { connectDB } from "@/lib/db";
import User  from "@/models/User";
import { UserType }  from "@/types/User";
import mongoose from "mongoose";

type ConditionalLayoutProps = PropsWithChildren<{
    session: any; 
    school: any;
}>;

export default async function ConditionalLayout({ children, session, school }: ConditionalLayoutProps) {
    let userData: UserType | null = null;
    
    if (session) {
  await connectDB();

  const userId = session.user_id; // string or object?
  const schoolId = session.school_id;


    userData = await User.findOne({
  _id: new mongoose.Types.ObjectId(userId),
  school_id: schoolId,
}).lean<UserType | null >();

console.log("User Data in Layout:", userData);
  


 
}
const user: UserType = userData
  ? {
      name: userData.name,
      username: userData.username,
      profile: userData.profile,
      role: userData.role,
      school_id: userData.school_id,
    }
  : {};

  console.log("User Object Passed to Header:", user);
    if (!session) {
        return <>{children}</>;
    }



    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <Header session={session} school={school} user={user} />
                <main>
                    <div className="mx-auto p-4 md:p-6 2xl:p-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}