"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";

import { SideMenuType } from "@/types/SideMenues";
import Loader from "@/utils/Loader";

import InputGroup from "../../FormElements/InputGroup";
import { TextAreaGroup } from "../../FormElements/InputGroup/text-area";
import { Select } from "../../FormElements/select";
import { ShowcaseSection } from "../../Layouts/showcase-section";
import { Switch } from "@/components/FormElements/switch";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

const AddRole = ({ sideMenus }: { sideMenus: SideMenuType[] | null }) => {
  const [loader, setLoader] = useState(false);
  const [role, setRole] = useState("C");
  const [roleName, setRoleName] = useState("");
  const [remark, setRemark] = useState("");

  const [acess, setAcess] = useState<
    Record<string, { view: boolean; update: boolean; edit: boolean }>
  >({});

  /** Generate access object only when sideMenus changes */
  useEffect(() => {
    if (!sideMenus) return;
    const mapped = Object.fromEntries(
      sideMenus.map((m) => [
        m.sideMenu_id!,
        { view: false, update: false, edit: false },
      ]),
    );
    setAcess(mapped);
  }, [sideMenus]);

  /** Update individual permission */
  const handelAcessClick = useCallback(
    (sideMenuId: string, type: "view" | "update" | "edit", value: boolean) => {
      setAcess((prev) => ({
        ...prev,
        [sideMenuId]: { ...prev[sideMenuId], [type]: value },
      }));
    },
    [],
  );

  /** Convert object to array */
  const accessArray = useMemo(
    () =>
      Object.entries(acess).map(([id, item]) => ({
        sideMenu_id: id,
        view: role !== "C" ? true : item.view,
        update: role !== "C" ? true : item.update,
        edit: role !== "C" ? true : item.edit,
      })),
    [acess, role],
  );

  /** Submit */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      school_id: "SCH-0001",
      role_name: roleName,
      role_type: role,
      remark,
      access: accessArray,
    };

    setLoader(true);
    try {
      const res = await fetch("/api/roles", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      console.log("Saved:", await res.json());
    } catch (error) {
      console.error("Error saving role:", error);
    } finally {
      setLoader(false);
    }
  };

  /** Reusable: Admin/User always true */
  const isDisabled = role === "A" || role === "U";

  return (
    <>
      <ShowcaseSection title="" className="!p-6.5">
        <form onSubmit={handleSubmit}>
          {/* Top Inputs */}
          <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
            <div className="flex w-full gap-4.5">
              <InputGroup
                label="Role Name"
                type="text"
                placeholder="Enter your first name"
                className="w-full"
                onChange={(e) => setRoleName(e.target.value)}
                value={roleName}
              />

              <Select
                label="Roll"
                defaultValue="C"
                className="w-1/2"
                onChange={setRole}
                items={[
                  { label: "Admin", value: "A" },
                  { label: "User", value: "U" },
                  { label: "Custom", value: "C" },
                ]}
              />
            </div>
          </div>

          {/* Table */}
          <div className="mb-4.5 shadow">
            <Table>
              <TableHeader>
                <TableRow className="border-t text-base [&>th]:py-3 sm:[&>th]:py-4.5">
                  <TableHead>Logo</TableHead>
                  <TableHead>Side Menu Name</TableHead>
                  <TableHead>Side Menu ID</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead>View</TableHead>
                  <TableHead>Update</TableHead>
                  <TableHead>Edit</TableHead>
                  <TableHead>Full Access</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {sideMenus?.length ? (
                  sideMenus.map((menu) => {
                    const id = menu.sideMenu_id as string;
                    const item = acess[id] ?? {};

                    return (
                      <TableRow
                        key={String(menu._id)}
                        className="text-base font-medium text-dark dark:text-white"
                      >
                        <TableCell>
                          <Image
                            src={String(menu.logo)}
                            width={60}
                            height={50}
                            alt={String(menu.name)}
                            className="aspect-[6/5] w-15 rounded-[5px] object-cover"
                          />
                        </TableCell>

                        <TableCell>{menu.name}</TableCell>
                        <TableCell>{id}</TableCell>
                        <TableCell>{menu.url}</TableCell>
                        <TableCell>{menu.updated_at}</TableCell>

                        {(["view", "update", "edit"] as const).map((key) => {
                          const isAdmin = role === "A";
                          const isUser = role === "U";
                          const isCustom = role === "C";

                          // FIXED VALUES FOR USER ROLE
                          let userValue = false;
                          if (key === "view") userValue = true;
                          if (key === "update") userValue = true;
                          if (key === "edit") userValue = false;

                          return (
                            <TableCell key={key}>
                              <Switch
                                withIcon
                                disabled={isAdmin || isUser} // Admin + User both disabled
                                checked={
                                  isAdmin
                                    ? true // ADMIN: all true
                                    : isUser
                                      ? userValue // USER: view=true, update=true, edit=false
                                      : item[key] // CUSTOM: free values
                                }
                                onChange={(value) =>
                                  handelAcessClick(id, key, value)
                                }
                              />
                            </TableCell>
                          );
                        })}

                        <TableCell>
                          <Switch
                            withIcon
                            disabled={role === "A" || role === "U"}
                            checked={
                              role === "A"
                                ? true // Admin full access ON
                                : role === "U"
                                  ? false // User full access OFF
                                  : item.view && item.update && item.edit // Custom toggle value
                            }
                            onChange={(value) => {
                              if (role !== "C") return; // Only Custom role can toggle

                              setAcess((prev) => ({
                                ...prev,
                                [id]: value
                                  ? { view: true, update: true, edit: true } // FULL → ON
                                  : { view: false, update: false, edit: false }, // FULL → OFF
                              }));
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="py-4 text-center">
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <TextAreaGroup
            label="Remark"
            placeholder="Type your message"
            onChange={setRemark}
          />

          <button className="mt-6 w-full rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
            Save Role
          </button>
        </form>
      </ShowcaseSection>

      {loader && <Loader />}
    </>
  );
};

export default AddRole;
