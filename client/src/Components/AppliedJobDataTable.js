import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function AppliedJobDataTable({ applications }) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const columns = [
    {
      name: "Apply Date",
      selector: (row) =>
        new Date(`${row?.createdAt}`).toLocaleDateString("en-GB"),
    },
    {
      name: "Company",
      selector: (row) => row?.job?.company,
    },
    {
      name: "Job title",
      selector: (row) => row?.job?.title,
    },
    {
      name: "Job Salary ",
      selector: (row) => row?.job?.salary,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => router.push(`/jobDetails/${row?.job?._id}`)}
          className="my-2 rounded border border-indigo-600 px-1 py-1 text-xs text-indigo-600 transition-all duration-700 hover:bg-indigo-600 hover:text-white md:px-2 md:py-2"
        >
          view Detail
        </button>
      ),
    },
  ];

  const filteredData = applications.filter((application) => {
    return (
      application?.job?.company.toLowerCase().includes(search.toLowerCase()) ||
      application?.job?.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      <DataTable
        subHeaderAlign={"right"}
        columns={columns}
        data={filteredData}
        keyField="id"
        pagination
        title={`Total Applied Jobs: ${applications.length}`}
        fixedHeader
        fixedHeaderScrollHeight="79%"
        subHeader
        persistTableHead
        subHeaderComponent={
          <input
            className="w-64 max-w-full border-b-2 border-indigo-600 px-2 py-2 outline-none"
            type={"search"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={"Search by Company or Job Title"}
          />
        }
        className="h-screen bg-white"
      />
    </>
  );
}
