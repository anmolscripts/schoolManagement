"use client";

import { SideMenuType } from "@/types/SideMenues";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { RoleType } from "@/types/role";
import AddStaffForm from "./AddStaffForm";

type RolesProps = {
  sideMenus: SideMenuType[] | null;
  roles: RoleType[] | null;
};

const Staff = ({ sideMenus, roles }: RolesProps) => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="rounded-[10px] bg-white shadow-3 dark:bg-gray-dark dark:shadow-card">
      {/* Header */}
      <div className="flex justify-between py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          {isAdding ? "Add Staff" : "Staffs List"}
        </h2>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className={`rounded-full px-4 py-2 font-bold text-white ${
            isAdding ? "bg-red-600" : "bg-dark"
          }`}
        >
          {isAdding ? "Cancel" : "Add Staff"}
        </button>
      </div>

      {/* Add Role Form */}
      {isAdding ? (
         <AddStaffForm /> 
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
              <TableHead>S. No</TableHead>
              <TableHead className="min-w-[120px] pl-5 sm:pl-6 xl:pl-7.5">
                Role Name
              </TableHead>
              <TableHead className="min-w-[120px] pl-5 sm:pl-6 xl:pl-7.5">
                Remark
              </TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {roles && roles.length > 0 ? (
              roles.map((role, index) => (
                <TableRow
                  key={role._id}
                  className="text-base font-medium text-dark dark:text-white"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{role.role_name}</TableCell>
                  <TableCell>{role.remark || "-"}</TableCell>
                  <TableCell>USERS</TableCell>
                  <TableCell>{role.updated_at}</TableCell>
                  <TableCell>
                    <button className="inline-flex items-center justify-center gap-2.5 rounded-full bg-rose-600 px-10 py-3.5 text-center font-medium text-white transition hover:bg-opacity-90 focus:outline-none lg:px-8 xl:px-10">
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="text-base font-medium text-dark dark:text-white">
                <TableCell colSpan={6}>No data found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* Skeleton Loader */}
      {!sideMenus && (
        <div className="block animate-pulse rounded-lg bg-white p-4 shadow-md">
          <div className="mb-2 h-8 w-full rounded bg-gray-300"></div>
          <div className="mb-2 h-8 w-full rounded bg-gray-300"></div>
        </div>
      )}
    </div>
  );
};

export default Staff;
