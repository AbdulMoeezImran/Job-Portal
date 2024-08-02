import React from "react";
import { BsDot } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import Router from "next/router";

const JobsCard = ({ job, posted }) => {
  return (
    <div className="w-full cursor-pointer  transition-all duration-1000  md:w-5/12 m-4 border hover:shadow-xl rounded px-4 md:flex md:flex-wrap">
      <div className="mb-4 flex  items-center justify-center py-2">
        {job.logo ? (
          <img
            src={job.logo}
            className="size-[70px] rounded-full"
            alt="profile"
          />
        ) : (
          <p className="bg-indigo-600 text-white rounded-full text-xl size-[70px] flex justify-center items-center">
            {job.company.slice(0, 2).toUpperCase()}
          </p>
        )}
        <div className="flex flex-col mx-2 px-2">
          <h1 className="text-xl md:text-2xl font-semibold">{job.title}</h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-800">
            {job.company}
          </p>
        </div>
      </div>
      <div className="mb-4 flex   items-start justify-center py-2 flex-col">
        <div className="flex  px-2 py-2 items-center justify-center ">
          <BsDot className="text-4xl font-extrabold text-indigo-600" />
          <h1 className="text-lg text-gray-900">Salary:&nbsp;</h1>
          <p className="text-base  font-semibold">{job.salary} / month</p>
        </div>
        <div className="flex px-2 py-2 items-center  justify-center">
          <BsDot className="text-4xl font-extrabold text-indigo-600" />
          <h1 className="text-lg text-gray-900">Deadline:&nbsp;</h1>
          <p className="text-base  font-semibold">
            {new Date(`${job.job_deadline}`).toLocaleDateString("en-GB")}
          </p>
        </div>
      </div>
      <div className="mb-4 flex flex-col md:flex-wrap md:flex-row w-full justify-between  items-center ">
        <div className="mb-4 flex  items-start justify-center py-2 flex-col">
          <div className="flex px-6 rounded-2xl capitalize py-1 items-center justify-center bg-indigo-200 text-indigo-900  ">
            <p>{job.address} </p>
          </div>
        </div>
        <button
          onClick={() =>
            Router.push(
              posted
                ? `/detailPostedJob/${job?._id}`
                : `/jobDetails/${job._id}`,
            )
          }
          className="my-2 py-2 px-4  border border-indigo-600   rounded flex items-center justify-center transition-all duration-700 hover:bg-indigo-600 hover:text-white text-indigo-600 font-semibold"
        >
          View Detail <AiOutlineArrowRight className="mx-2 text-xl" />
        </button>
      </div>
    </div>
  );
};

export default JobsCard;
