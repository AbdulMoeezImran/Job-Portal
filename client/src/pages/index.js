import JobsCard from "@/Components/JobsCard";
import Loader from "@/Components/Loader";
import { getRequest } from "@/GlobalFunctions/ApiRequest";
import { setJobData } from "@/Redux/slice";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";

export default function Home() {
  const dispatch = useDispatch();
  const JobData = useSelector(state => state.jobs.JobData);

  const getJob = async () => {
    try {
      const data = await getRequest("/jobs");
      dispatch(setJobData(data));
    } catch (error) {
      console.error(error);
    }
  };

  const { isLoading } = useSWR("/getjobs", getJob);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full py-20 flex items-center md:px-8 px-2 justify-center flex-col">
      <h1 className="px-4 mx-2 py-2 uppercase tracking-wider border-b-2 border-b-indigo-600 text-3xl font-semibold">
        Available Jobs
      </h1>
      <div className="w-full h-full py-4 flex  overflow-y-auto  items-center justify-center flex-wrap">
        {JobData.length > 0 ? (
          JobData.map(job => <JobsCard job={job} key={job?._id} />)
        ) : (
          <p>No jobs found</p>
        )}
      </div>
    </div>
  );
}
