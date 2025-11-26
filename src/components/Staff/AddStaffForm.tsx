"use client";

import { useState } from "react";
import ImagePicker from "../FormElements/ImagePicker/ImagePicker";
import InputGroup from "../FormElements/InputGroup";
import { Select } from "../FormElements/select";

const AddStaffForm = () => {
  const [form, setForm] = useState({
    personal: {
      first_name: "",
      last_name: "",
      gender: "",
      dob: "",
      mobile: "",
      email: "",
      father_name: "",
      qualification: "",
      marital_status: "",
      blood_group: "",
      aadhar: "",
      pan: "",
      spouse_name: "",
      spouse_dob: "",
    },
    job: {
      department: "",
      sub_department: "",
      designation: "",
      group: "",
      join_date: "",
      appointment_date: "",
      employment_type: "",
      contract_from: "",
      contract_to: "",
    },
  });

  const updateField = (section: string, field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    console.log("Submitting Staff:", form);
    // TODO: call API here
  };

  return (
    <form onSubmit={submitHandler} className="space-y-6 p-6">
      {/* SECTION TITLE */}
      <h3 className="text-xl font-semibold text-dark dark:text-white">
        Personal Information
      </h3>

      {/* PERSONAL SECTION */}

      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-3">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Select
              label="Title"
              defaultValue="C"
              className="w-full"
              onChange={() => {}}
              items={[
                { label: "Admin", value: "A" },
                { label: "User", value: "U" },
                { label: "Custom", value: "C" },
              ]}
            />
            <InputGroup
              label="First Name"
              type="text"
              placeholder="Enter your first name"
              className="w-full"
              onChange={(e) => {}}
              value={""}
            />

            <InputGroup
              label="Last Name"
              type="text"
              placeholder="Enter your first name"
              className="w-full"
              onChange={(e) => {}}
              value={""}
            />
            <Select
              label="Gender"
              defaultValue="C"
              className="w-full"
              onChange={() => {}}
              items={[
                { label: "Admin", value: "A" },
                { label: "User", value: "U" },
                { label: "Custom", value: "C" },
              ]}
            />
            <InputGroup
              label="Date of Birth"
              type="date"
              placeholder="Enter your first name"
              className="w-full"
              onChange={(e) => {}}
              value={""}
            />

            <Select
              label="Blood Group"
              defaultValue="C"
              className="w-full"
              onChange={() => {}}
              items={[
                { label: "Admin", value: "A" },
                { label: "User", value: "U" },
                { label: "Custom", value: "C" },
              ]}
            />

            <InputGroup
              label="Email"
              type="email"
              placeholder="Enter your first name"
              className="w-full"
              onChange={(e) => {}}
              value={""}
            />

            <InputGroup
              label="Mobile Number"
              type="number"
              placeholder="Enter your first name"
              className="w-full"
              onChange={(e) => {}}
              value={""}
            />

            <Select
              label="Religion"
              defaultValue="C"
              className="w-full"
              onChange={() => {}}
              items={[
                { label: "Admin", value: "A" },
                { label: "User", value: "U" },
                { label: "Custom", value: "C" },
              ]}
            />
            <Select
              label="Marital Status"
              defaultValue="C"
              className="w-full"
              onChange={() => {}}
              items={[
                { label: "Admin", value: "A" },
                { label: "User", value: "U" },
                { label: "Custom", value: "C" },
              ]}
            />

            <InputGroup
              label="Father's Name"
              type="number"
              placeholder="Enter your first name"
              className="w-full"
              onChange={(e) => {}}
              value={""}
            />

            <Select
              label="Qualification"
              defaultValue="C"
              className="w-full"
              onChange={() => {}}
              items={[
                { label: "Admin", value: "A" },
                { label: "User", value: "U" },
                { label: "Custom", value: "C" },
              ]}
            />
          </div>
        </div>
        <div className="col-span-1">
          <ImagePicker />
        </div>
      </div>

      {/* SECTION TITLE */}
      <h3 className="pt-4 text-xl font-semibold text-dark dark:text-white">
        Other Information
      </h3>

      {/* JOB SECTION */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <InputGroup
          label="Aadhar Number"
          type="number"
          placeholder="Enter your first name"
          className="w-full"
          onChange={(e) => {}}
          value={""}
        />

        <InputGroup
          label="Pan Number"
          type="number"
          placeholder="Enter your first name"
          className="w-full"
          onChange={(e) => {}}
          value={""}
        />

      </div>

      {/* SECTION TITLE */}
      <h3 className="pt-4 text-xl font-semibold text-dark dark:text-white">
        Job Information
      </h3>

      {/* JOB SECTION */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Department"
          onChange={(e) => updateField("job", "department", e.target.value)}
          className="rounded border p-3"
        />

        <input
          type="text"
          placeholder="Designation"
          onChange={(e) => updateField("job", "designation", e.target.value)}
          className="rounded border p-3"
        />

        <input
          type="date"
          placeholder="Joining Date"
          onChange={(e) => updateField("job", "join_date", e.target.value)}
          className="rounded border p-3"
        />

        <input
          type="text"
          placeholder="Employment Type"
          onChange={(e) =>
            updateField("job", "employment_type", e.target.value)
          }
          className="rounded border p-3"
        />
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="mt-4 rounded-full bg-dark px-10 py-3.5 font-medium text-white hover:bg-opacity-90"
      >
        Save Staff
      </button>
    </form>
  );
};

export default AddStaffForm;
