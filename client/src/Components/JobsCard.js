import React, { useState } from "react";
import { BsDot } from "react-icons/bs";
import { AiOutlineArrowRight, AiOutlineEdit } from "react-icons/ai";
import Router from "next/router";
import EditJob from "./EditJob";

const JobsCard = ({ job, posted }) => {
  const [editJob, setEditJob] = useState(null);

  return (
    <>
      <div className="m-4 w-full cursor-pointer rounded border px-4 transition-all duration-1000 hover:shadow-xl md:flex md:w-5/12 md:flex-wrap">
        <div className="mb-4 flex items-center justify-center py-2">
          {job.logo ? (
            <img
              src={job.logo}
              className="size-[70px] rounded-full"
              alt="profile"
            />
          ) : (
            <p className="flex size-[70px] items-center justify-center rounded-full bg-indigo-600 text-xl text-white">
              {job.company.slice(0, 2).toUpperCase()}
            </p>
          )}
          <div className="mx-2 flex flex-col px-2">
            <h1 className="text-xl font-semibold md:text-2xl">{job.title}</h1>
            <p className="text-xs text-gray-800 sm:text-sm md:text-base">
              {job.company}
            </p>
          </div>
        </div>
        <div className="mb-4 flex flex-col items-start justify-center py-2">
          <div className="flex items-center justify-center px-2 py-2">
            <BsDot className="text-4xl font-extrabold text-indigo-600" />
            <h1 className="text-lg text-gray-900">Salary:&nbsp;</h1>
            <p className="text-base font-semibold">{job.salary} / month</p>
          </div>
          <div className="flex items-center justify-center px-2 py-2">
            <BsDot className="text-4xl font-extrabold text-indigo-600" />
            <h1 className="text-lg text-gray-900">Deadline:&nbsp;</h1>
            <p className="text-base font-semibold">
              {new Date(`${job.job_deadline}`).toLocaleDateString("en-GB")}
            </p>
          </div>
        </div>
        <div className="md:flex-rwcb max-md:flex-cc mb-4 w-full justify-between">
          <div className="flex flex-col items-start justify-center py-2">
            <div className="flex items-center justify-center rounded-2xl bg-indigo-200 px-6 py-1 capitalize text-indigo-900">
              <p>{job.address} </p>
            </div>
          </div>
          <div className="flex-rc gap-2">
            <button
              onClick={() =>
                Router.push(
                  posted
                    ? `/postedJobDetails/${job?._id}`
                    : `/jobDetails/${job._id}`,
                )
              }
              className="flex items-center justify-center rounded border border-indigo-600 px-4 py-2 font-semibold text-indigo-600 transition-all duration-700 hover:bg-indigo-600 hover:text-white"
            >
              View Detail <AiOutlineArrowRight className="mx-2 text-xl" />
            </button>
            {posted && (
              <button
                onClick={() => setEditJob(job)}
                className="flex-rcc h-[42px] rounded border border-indigo-600 bg-indigo-600 px-2 font-semibold text-white transition-all duration-700 hover:bg-white hover:text-indigo-600"
              >
                <AiOutlineEdit className="size-5" />
              </button>
            )}
          </div>
        </div>
      </div>
      {editJob && <EditJob editJob={editJob} setEditJob={setEditJob} />}
    </>
  );
};

export default JobsCard;
