import Loader from "@/Components/Loader";
import { getRequest } from "@/GlobalFunctions/ApiRequest";
import ApplicationsDataTable from "@/components/ApplicationsDataTable";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";

export default function PostedJobDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [applications, setApplications] = useState([]);

  console.log(applications);

  const getAppliedJobDetail = async () => {
    if (id) {
      try {
        const data = await getRequest(
          `/applied-jobs/getappliedjobdetails/${id}`,
        );
        console.log(data);
        setApplications(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const { isLoading } = useSWR(`/getappliedjobdetails`, getAppliedJobDetail);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full pt-20">
          <div className="flex h-20 w-full flex-col items-center justify-center font-bold text-indigo-600">
            <h1 className="text-3xl">Jobs Applications</h1>
          </div>
          <div className="h-full w-full px-4">
            <ApplicationsDataTable applications={applications} />
          </div>
        </div>
      )}
    </>
  );
}
