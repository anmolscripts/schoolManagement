"use client";
import { SideMenuType } from "@/types/SideMenues";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Image from "next/image";
import AddUsers from ".././AddUser";
import AddRole from "./AddRole";

const Roles = ({ sideMenus }: { sideMenus: SideMenuType[] | null }) => {
  const [addUser, setAddUser] = useState(false);
  const [title, setTitle] = useState("Users List");
  const handelAddUserClick = () => {
    setTitle("Add User");
    setAddUser(true);
  };
  const handelCancelClick = () => {
    setTitle("Users List");
    setAddUser(false);
  };
  const [usersData, setUsersData] = useState<UsersType[] | null>(sideMenus);
  useEffect(() => {
    console.log(usersData);
  }, [usersData]);

  return (
    <div className="rounded-[10px] bg-white dark:bg-gray-dark dark:shadow-card shadow-3">
      <div className="flex justify-between py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          {title}
        </h2>
        {addUser ? (
          <button
            onClick={handelCancelClick}
            className="rounded-full bg-red-600 px-4 py-2 font-bold text-white"
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={handelAddUserClick}
            className="rounded-full bg-dark px-4 py-2 font-bold text-white"
          >
            Add User
          </button>
        )}
      </div>
      {addUser ? (
        <AddRole sideMenus = {usersData} />
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
              <TableHead>Logo</TableHead>
              <TableHead className="min-w-[120px] pl-5 sm:pl-6 xl:pl-7.5">
                Side Menu Name
              </TableHead>
              <TableHead className="min-w-[120px] pl-5 sm:pl-6 xl:pl-7.5">
                Side Menu ID
              </TableHead>
              <TableHead>Role</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {usersData ? (
              usersData.map((user) => (
                <TableRow
                  className="text-base font-medium text-dark dark:text-white"
                  key={user._id}
                >
                  <TableCell className="flex min-w-fit items-center gap-3 pl-5 sm:pl-6 xl:pl-7.5">
                    <Image
                      src={user.logo}
                      className="aspect-[6/5] w-15 rounded-[5px] object-cover"
                      width={60}
                      height={50}
                      alt={"Image for product " + user.name}
                      role="presentation"
                    />
                    <div>{user.name}</div>
                  </TableCell>

                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.sideMenu_id}</TableCell>

                  <TableCell>${user.url}</TableCell>

                  <TableCell>{user.updated_at}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow
                className="text-base font-medium text-dark dark:text-white"
                key={1}
              >
                <TableCell colSpan={6}>No data found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <div className={`animate-pulse rounded-lg bg-white p-4 shadow-md ${usersData ? 'hidden' : 'block'}`}>
        <div className="mb-2 h-8 w-full rounded bg-gray-300"></div>
        <div className="mb-2 h-8 w-full rounded bg-gray-300"></div>
      </div>
    </div>
  );
};

export default Roles;
