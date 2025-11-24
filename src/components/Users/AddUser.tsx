import ImagePicker from "../FormElements/ImagePicker/ImagePicker";
import InputGroup from "../FormElements/InputGroup";
import { TextAreaGroup } from "../FormElements/InputGroup/text-area";
import { Select } from "../FormElements/select";
import { ShowcaseSection } from "../Layouts/showcase-section";

const AddUsers = () => {
  return (
    <>
      <ShowcaseSection title="" className="!p-6.5">
        <form action="#">
          <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
            <div className="w-3/4">
              <div className="flex gap-4.5">
                <InputGroup
                  label="Full Name"
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full xl:w-1/2"
                  
                />

                <InputGroup
                  label="Email"
                  type="email"
                  placeholder="Enter your last name"
                  className="w-full xl:w-1/2"
                  
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
            <div className="w-1/4" style={{height: '18rem'} }>
              <ImagePicker />
            </div>
          </div>


          <TextAreaGroup label="Remark" placeholder="Type your message" />

          <button className="mt-6 flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
            Send Message
          </button>
        </form>
      </ShowcaseSection>
    </>
  );
};

export default AddUsers;
