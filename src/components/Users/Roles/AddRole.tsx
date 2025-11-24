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
const AddRole = ({ sideMenus }: { sideMenus: SideMenuType[] | null }) => {
  return (
    <>
      <ShowcaseSection title="" className="!p-6.5">
        <form action="#">
          <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
            <div className="w-full">
              <div className="flex gap-4.5">
                <InputGroup
                  label="Role Name"
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full"
                  
                />

              </div>
              <div className="flex gap-4.5 mt-4">
                <Select
                              label="Gender"
                              items={[
                                { label: "Male", value: "M" },
                                { label: "Female", value: "F" },
                                { label: "Other", value: "O" },
                              ]}
                              defaultValue="USA"
                              className="w-1/2 "
                              
                            />

                <Select
                              label="Depertmant"
                              items={[
                                { label: "Male", value: "M" },
                                { label: "Female", value: "F" },
                                { label: "Other", value: "O" },
                              ]}
                              defaultValue="USA"
                              className="w-1/2 "
                              
                            />
              </div>
              <div className="flex gap-4.5 mt-4">
                <Select
                              label="Roll"
                              items={[
                                { label: "Male", value: "M" },
                                { label: "Female", value: "F" },
                                { label: "Other", value: "O" },
                              ]}
                              defaultValue="USA"
                              className="w-1/2 "
                              
                            />

                <InputGroup
                  label="User Name"
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full xl:w-1/2"
                  
                />
              </div>
            </div>
            
          </div>
          <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row shadow">
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
                    {sideMenus ? (
                      sideMenus.map((user) => (
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
            
          </div>
            

          <TextAreaGroup label="Remark" placeholder="Type your message" />

          <button className="mt-6 flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
            Send Message
          </button>
        </form>
      </ShowcaseSection>
    </>
  );
}

export default AddRole