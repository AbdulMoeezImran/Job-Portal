import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { BsBriefcaseFill, BsFillBookmarkCheckFill } from "react-icons/bs";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { RiUserSearchFill } from "react-icons/ri";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { HiOutlineStar } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getRequest } from "@/GlobalFunctions/ApiRequest";
import { errorToast } from "@/GlobalFunctions/toasts";
import { useSelector } from "react-redux";
import Loader from "@/Components/Loader";

export default function JobDetails() {
  const router = useRouter();
  const userInfo = useSelector(state => state.user.userInfo);
  const { id } = router.query;
  const [JobDetails, setJobDetails] = useState(null);

  const getJobById = async () => {
    if (id) {
      try {
        const data = await getRequest(`/jobs/${id}`);
        setJobDetails(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const { isLoading } = useSWR(`/jobs`, getJobById);

  useEffect(() => {
    getJobById();
  }, [id]);

  const handleApply = () => {
    if (!userInfo) {
      errorToast("Please login to apply");
      return;
    }
    router.push(`/applyJob/${id}`);
  };

  const handleBookMark = async () => {};

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : JobDetails ? (
        <div className="w-full py-20 flex items-center md:px-8 px-2 justify-center flex-col">
          <div className="w-full h-40 bg-gray-50 text-indigo-600 font-bold flex items-center justify-center flex-col">
            <h1 className="text-3xl">Job Details</h1>
          </div>
          {/* Job User Details */}
          <div className="flex items-center justify-center w-full py-10">
            <div className="flex w-full px-8 md:px-20 items-center md:flex-row gap-10 flex-col md:justify-between justify-center">
              <div className="flex mb-1 items-center justify-center">
                <p className="bg-indigo-600 mb-2 text-white rounded-full text-xl size-[100px] flex justify-center items-center">
                  {JobDetails.name.slice(0, 2).toUpperCase()}
                </p>
                <div className="px-4 mx-2 flex flex-col items-start justify-center">
                  <p className="font-semibold text-base mb-1">
                    {JobDetails.title}{" "}
                  </p>
                  <p className=" text-sm text-gray-800 mb-1">
                    {JobDetails.company}
                  </p>
                </div>
              </div>

              {/* Job highlights */}
              <div className="md:px-4 mb-1 px-2 md:mx-2 flex flex-wrap items-center grow justify-between">
                <div className="flex items-center justify-center mb-1">
                  <FaUserAstronaut className="text-xs font-semibold text-indigo-600" />
                  <p className="font-semibold text-base mx-1">Job Poster </p>
                  <p className=" text-sm text-gray-800 mx-1">
                    {JobDetails.name}
                  </p>
                </div>
                <div className="flex items-center justify-center mb-1">
                  <MdEmail className="text-xs font-semibold text-indigo-600" />
                  <p className="font-semibold text-base mx-1">Email </p>
                  <p className=" text-sm text-gray-800 mx-1">
                    {JobDetails.email}
                  </p>
                </div>
                <div className="flex items-center justify-center mb-1">
                  <BsBriefcaseFill className="text-xs font-semibold text-indigo-600" />
                  <p className="font-semibold text-base mx-1">Job Type </p>
                  <p className="text-sm text-gray-800 mx-1">
                    {JobDetails.job_type}
                  </p>
                </div>
                <div className="flex items-center justify-center mb-1">
                  <AiOutlineDollarCircle className="text-xs font-semibold text-indigo-600" />
                  <p className="font-semibold text-base mx-1">Salary </p>
                  <p className=" text-sm text-gray-800 mx-1">
                    $ {JobDetails.salary}{" "}
                  </p>
                </div>
              </div>

              {/* Apply */}
              <div className="flex items-center justify-center">
                {JobDetails.email === userInfo?.email ? (
                  <p className="text-xs text-red-500">
                    unable Apply to your Own jobs
                  </p>
                ) : (
                  <div className="flex items-center justify-center  ">
                    <BsFillBookmarkCheckFill
                      onClick={handleBookMark}
                      className="text-indigo-600 text-4xl cursor-pointer  mx-2"
                    />
                    <button
                      onClick={handleApply}
                      className="md:px-6 md:py-3 px-3 py-2 mt-2 md:mt-0 bg-indigo-500 rounded text-base tracking-widest uppercase transition-all duration-700 hover:bg-indigo-900 text-white  "
                    >
                      Apply Position
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full md:px-4 py-2 flex items-center md:items-start md:flex-row flex-col justify-start md:justify-center">
            <div className="md:w-8/12 w-full md:px-4 py-8 flex flex-col items-center content-start justify-center ">
              <h1 className="text-center lg:text-2xl font-semibold text-xl mb-4 uppercase border-b-2 border-indigo-600 py-2">
                Job Description
              </h1>
              <p className="px-4">{JobDetails.description}</p>
            </div>
            <div className="md:w-4/12 w-full py-8 px-4 md:px-10">
              <h1 className=" text-2xl font-semibold mb-2">Job Summary</h1>
              <div className="flex items-center justify-start mb-3">
                <RiUserSearchFill className="text-base font-semibold text-indigo-600" />
                <p className="font-semibold text-base mx-1">Total Vacancies </p>
                <p className=" text-sm text-gray-800 mx-1">
                  {JobDetails.job_vacancy}
                </p>
              </div>
              <div className="flex items-center justify-start mb-3">
                <BsFillCalendar2DateFill className="text-base font-semibold text-indigo-600" />
                <p className="font-semibold text-base mx-1">Dead Line</p>
                <p className=" text-sm text-gray-800 mx-1">
                  {new Date(`${JobDetails.job_deadline}`).toLocaleDateString(
                    "en-GB"
                  )}
                </p>
              </div>
              <div className="flex items-center justify-start mb-3">
                <HiOutlineStar className="text-base font-semibold text-indigo-600" />
                <p className="font-semibold text-base mx-1">
                  Experience Required
                </p>
                <p className=" text-sm text-gray-800 mx-1">
                  {JobDetails.job_experience}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full py-4 flex  overflow-y-auto  items-center justify-center flex-wrap">
          <p>Job Not Found</p>
        </div>
      )}
    </>
  );
}
