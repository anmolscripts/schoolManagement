'use client';
import React from 'react';

const SchoolDetail = ({ name, id }: { name: string, id: string }) => {
  return (
    <>
      <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
        {name}
      </h1>
      <p className="font-medium">{id}</p>
    </>
  );
};

export default SchoolDetail;
