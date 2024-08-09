import AppliedJobDataTable from "@/components/AppliedJobDataTable";
import Loader from "@/Components/Loader";
import { getRequest } from "@/GlobalFunctions/ApiRequest";
import { useState } from "react";
import useSWR from "swr";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);

  const fetchAppliedJobs = async () => {
    try {
      const data = await getRequest(`/applied-jobs/getAppliedJobs`);
      console.log(data);
      setApplications(data);
    } catch (error) {
      console.log(error);
    }
  };

  const { isLoading } = useSWR(`/getAppliedJobs`, fetchAppliedJobs);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full pt-20">
          <div className="flex h-20 w-full flex-col items-center justify-center font-bold text-indigo-600">
            <h1 className="text-3xl">Applied Jobs</h1>
          </div>

          {/* applied Jobs */}
          <div className="h-full w-full px-4">
            <AppliedJobDataTable applications={applications} />
          </div>
        </div>
      )}
    </>
  );
}
