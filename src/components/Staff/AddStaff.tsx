"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import AddStaffForm from "./AddStaffForm";

type StaffProps = {
  staffList: any[] | null;
};

const AddStaff = ({ staffList }: StaffProps) => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="rounded-[10px] bg-white shadow-3 dark:bg-gray-dark dark:shadow-card">
      {/* Header */}
      <div className="flex justify-between py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          {isAdding ? "Add Staff" : "Staff List"}
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

      {/* Add Staff Form */}
      {isAdding ? (
        <AddStaffForm />
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
              <TableHead>S. No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {staffList && staffList.length > 0 ? (
              staffList.map((staff, index) => (
                <TableRow
                  key={staff._id}
                  className="text-base font-medium text-dark dark:text-white"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {staff.personal.first_name} {staff.personal.last_name}
                  </TableCell>
                  <TableCell>{staff.job.department || "-"}</TableCell>
                  <TableCell>{staff.job.designation || "-"}</TableCell>
                  <TableCell>{staff.personal.mobile || "-"}</TableCell>
                  <TableCell>{staff.updated_at}</TableCell>

                  <TableCell>
                    <button className="inline-flex items-center justify-center gap-2.5 rounded-full bg-rose-600 px-10 py-3.5 text-center font-medium text-white transition hover:bg-opacity-90 focus:outline-none lg:px-8 xl:px-10">
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="text-base font-medium text-dark dark:text-white">
                <TableCell colSpan={7}>No staff found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AddStaff;
