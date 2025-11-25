"use client";
import { SideMenuType } from "@/types/SideMenues";
import ImagePicker from "../../FormElements/ImagePicker/ImagePicker";
import InputGroup from "../../FormElements/InputGroup";
import { TextAreaGroup } from "../../FormElements/InputGroup/text-area";
import { Select } from "../../FormElements/select";
import { ShowcaseSection } from "../../Layouts/showcase-section";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Image from "next/image";
import { Switch } from "@/components/FormElements/switch";
import { use, useEffect, useState } from "react";
const AddRole = ({ sideMenus }: { sideMenus: SideMenuType[] | null }) => {
  console.log(sideMenus);
  const [role, setRole] = useState("C");
  const [acess, setAcess] = useState<
    Record<string, { view: boolean; update: boolean; edit: boolean }>
  >({});


  const [remark, setRemark] = useState("");

  useEffect(() => {
    const newAcess: Record<
      string,
      { view: boolean; update: boolean; edit: boolean }
    > = {};
    sideMenus?.forEach((menu) => {
      newAcess[menu.sideMenu_id as string] = {
        view: false,
        update: false,
        edit: false,
      };
    });
    setAcess(newAcess);
  }, [sideMenus]);
  useEffect(() => {
    console.table(acess);
  }, [acess]);

  const handelAcessClick = (
    sideMenuId: string,
    type: "view" | "update" | "edit",
    value: boolean,
  ) => {
    setAcess({
      ...acess,
      [sideMenuId]: {
        ...acess[sideMenuId],
        [type]: value,
      },
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const accessArray = Object.keys(acess).map((id) => ({
      sideMenu_id: id,
      view: role === "A" || role === "U" ? true : acess[id].view,
      update: role === "A" || role === "U" ? true : acess[id].update,
      edit: role === "A" || role === "U" ? true : acess[id].edit,
    }));

    const payload = {
      school_id: "SCH-0001", // get from session/user
      role_name: role,
      remark,
      access: accessArray,
    };

    const res = await fetch("/api/roles", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("Saved:", data);
  };

  return (
    <>
      <ShowcaseSection title="" className="!p-6.5">
        <form onSubmit={handleSubmit}>
          <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
            <div className="w-full">
              <div className="flex gap-4.5">
                <InputGroup
                  label="Role Name"
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full"
                />
                <Select
                  onChange={(value) => setRole(value)}
                  label="Roll"
                  items={[
                    { label: "Admin", value: "A" },
                    { label: "User", value: "U" },
                    { label: "Custom", value: "C" },
                  ]}
                  defaultValue="C"
                  className="w-1/2"
                />
              </div>
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-4.5 shadow xl:flex-row">
            <Table>
              <TableHeader>
                <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
                  <TableHead>Logo</TableHead>
                  <TableHead className="min-w-[120px]">
                    Side Menu Name
                  </TableHead>
                  <TableHead className="">Side Menu ID</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>View</TableHead>
                  <TableHead>Update</TableHead>
                  <TableHead>Edit</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {sideMenus ? (
                  sideMenus.map((user) => (
                    <TableRow
                      className="text-base font-medium text-dark dark:text-white"
                      key={`${user._id}`}
                    >
                      <TableCell className="flex min-w-fit items-center gap-3">
                        <Image
                          src={`${user.logo}`}
                          className="aspect-[6/5] w-15 rounded-[5px] object-cover"
                          width={60}
                          height={50}
                          alt={"Image for product " + user.name}
                          role="presentation"
                        />
                      </TableCell>

                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.sideMenu_id}</TableCell>

                      <TableCell>${user.url}</TableCell>

                      <TableCell>{user.updated_at}</TableCell>
                      <TableCell>
                        <Switch
                          withIcon
                          checked={
                            role === "A" ||
                            role === "U" ||
                            (acess[`${user.sideMenu_id}`]?.view ?? false)
                          }
                          disabled={role == "A" || role == "U" ? true : false}
                          onChange={(value) => {
                            handelAcessClick(
                              `${user.sideMenu_id}`,
                              "view",
                              value,
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          withIcon
                          checked={
                            role === "A" ||
                            role === "U" ||
                            (acess[`${user.sideMenu_id}`]?.update ?? false)
                          }
                          disabled={role == "A" || role == "U" ? true : false}
                          onChange={(value) => {
                            handelAcessClick(
                              `${user.sideMenu_id}`,
                              "update",
                              value,
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          withIcon
                          checked={
                            role === "A" ||
                            (acess[`${user.sideMenu_id}`]?.edit ?? false)
                          }
                          disabled={role == "A" || role == "U" ? true : false}
                          onChange={(value) => {
                            handelAcessClick(
                              `${user.sideMenu_id}`,
                              "edit",
                              value,
                            );
                          }}
                        />
                      </TableCell>
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
          </div>

          <TextAreaGroup label="Remark" placeholder="Type your message" onChange={(value) => setRemark(value)} />

          <button className="mt-6 flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
            Save Role
          </button>
        </form>
      </ShowcaseSection>
    </>
  );
};

export default AddRole;
