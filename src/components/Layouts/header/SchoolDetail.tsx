import { getSession } from "@/lib/auth";
import React from "react";

const SchoolDetail = () => {
//   const session = await getSession();
//   console.log('Session => ', session);
//   if(session){
//     const request = new Request("http://localhost:3000/api/school", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ schoolCode: session?.school_id }),
//   });
//   // You can remove this code block
//   const response = await fetch(request);
//   console.log('Response => ', response);
//   }

  return (
    <>
      <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
        Testing
      </h1>
      <p className="font-medium">Testing</p>
    </>
  );
};

export default SchoolDetail;
