import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function ApplicationsDataTable({ applications }) {
  const [search, setSearch] = useState("");

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "CV",
      selector: (row) => (
        <Link href={row.cv}>
          <button className="w-20 rounded border border-indigo-600 py-2 text-xs text-indigo-600 transition-all duration-700 hover:bg-indigo-600 hover:text-white">
            Download CV
          </button>
        </Link>
      ),
    },
  ];

  const filteredData = applications.filter((application) => {
    return (
      application.name.toLowerCase().includes(search.toLowerCase()) ||
      application.email.toLowerCase().includes(search.toLowerCase())
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
        title={`Total Applications : ${applications.length}`}
        fixedHeader
        fixedHeaderScrollHeight="79%"
        subHeader
        persistTableHead
        subHeaderComponent={
          <input
            className="w-52 max-w-full border-b-2 border-indigo-600 px-2 py-2 outline-none"
            type={"search"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={"Search by Name or Email"}
          />
        }
        className="h-screen bg-white"
      />
    </>
  );
}
