import JobsCard from "@/Components/JobsCard";
import Loader from "@/Components/Loader";
import { getRequest } from "@/GlobalFunctions/ApiRequest";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";

export default function PostedJobs() {
  const user = useSelector((state) => state?.User?.userData);
  const [myJobs, setMyJobs] = useState([]);

  const id = user?._id;

  const getPostedJobs = async () => {
    try {
      const data = await getRequest("/jobs/getPostedJobs");
      console.log(data);
      setMyJobs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const { isLoading } = useSWR("/getPostedJobs", getPostedJobs);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full pt-20">
          <div className="flex h-20 w-full flex-col items-center justify-center font-bold text-indigo-600">
            <h1 className="text-3xl">Posted Jobs</h1>
          </div>
          <div className="flex h-full w-full flex-wrap items-start justify-center overflow-y-auto px-4 py-4">
            {myJobs.length > 0 ? (
              myJobs.map((job, index) => (
                <JobsCard key={index} job={job} posted={true} />
              ))
            ) : (
              <p>No jobs found</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
