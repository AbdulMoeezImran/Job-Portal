import Select from "react-select";
import React, { useState } from "react";
import Router from "next/router";
import { postRequest } from "@/GlobalFunctions/ApiRequest";
import { useSelector } from "react-redux";

const educationValues = [
  { value: "Intermediate", label: "Intermediate" },
  { value: "Bachlor", label: "Bachlor" },
  { value: "Master", label: "Master" },
];

const industryValues = [
  { value: "Business", label: "Business" },
  { value: "Banking", label: "Bachlor" },
  { value: "Education", label: "Education" },
  { value: "Telecommunication", label: "Telecommunication" },
  { value: "Others", label: "Others" },
];

const jobTypeValues = [
  { value: "Permanent", label: "Permanent" },
  { value: "Contractual", label: "Contractual" },
  { value: "Full Time", label: "Full Time" },
  { value: "Part Time", label: "Part Time" },
];

const jobExperienceValues = [
  { value: "0 Year", label: "0 Year" },
  { value: "1 Year", label: "1 Year" },
  { value: "2 Years", label: "2 Years" },
  { value: "3 Years", label: "3 Years" },
  { value: "5 Years", label: "5 Years" },
  { value: "10 Years", label: "10 Years" },
  { value: "10+ Years", label: "10+ Years" },
];

export default function Postajob() {
  const userInfo = useSelector(state => state.user.userInfo);
  const [formData, setFormData] = useState({
    title: "",
    salary: 0,
    description: "",
    education: "",
    industry: "",
    job_type: "",
    job_experience: "",
    job_vacancy: 0,
    job_deadline: "",
  });

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await postRequest("/jobs", formData, "application/json");
      Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full  py-20 flex items-center  justify-center flex-col">
      <h1 className="text-xl mt-4 uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl">
        Enter Job Details
      </h1>
      <form
        onSubmit={handleSubmit}
        className="sm:w-1/2 w-full px-4 mx-4  h-full"
      >
        <div className="w-full mb-4  flex flex-col items-start justify-center">
          <label htmlFor="title" className="mb-1 text-base font-semibold">
            Title :
          </label>
          <input
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            type="text"
            id="title"
            className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
            placeholder="Enter title of job"
            required
          />
        </div>
        <div className="w-full mb-4  flex flex-col items-start justify-center">
          <label htmlFor="salary" className="mb-1 text-base font-semibold">
            Salary :
          </label>
          <input
            onChange={e => setFormData({ ...formData, salary: e.target.value })}
            type="number"
            min="0"
            id="salary"
            className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
            placeholder="Enter salary per month"
            required
          />
        </div>

        <div className="w-full mb-4  flex flex-col items-start justify-center">
          <label htmlFor="description" className="mb-1 text-base font-semibold">
            Description :
          </label>
          <textarea
            onChange={e =>
              setFormData({ ...formData, description: e.target.value })
            }
            type="text"
            id="description"
            className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
            placeholder="Enter description of job"
            required
          />
        </div>

        <div className="w-full mb-4  flex flex-col items-start justify-center">
          <label htmlFor="education" className="mb-1 text-base font-semibold">
            Education :
          </label>
          <Select
            id="education"
            className="w-full mb-2 border border-indigo-600 rounded"
            onChange={e => setFormData({ ...formData, education: e.value })}
            placeholder="Please Select Education"
            options={educationValues}
            required
          />
        </div>

        <div className="w-full mb-4  flex flex-col items-start justify-center">
          <label htmlFor="industry" className="mb-1 text-base font-semibold">
            Industry :
          </label>
          <Select
            id="industry"
            className="w-full mb-2 border border-indigo-600 rounded"
            onChange={e => setFormData({ ...formData, industry: e.value })}
            placeholder="Please Select Industry"
            options={industryValues}
            required
          />
        </div>

        <div className="w-full mb-4  flex flex-col items-start justify-center">
          <label htmlFor="jobType" className="mb-1 text-base font-semibold">
            Job Type :
          </label>
          <Select
            id="jobType"
            className="w-full mb-2 border border-indigo-600 rounded"
            onChange={e => setFormData({ ...formData, job_type: e.value })}
            placeholder="Please Select Job type"
            options={jobTypeValues}
            required
          />
        </div>

        <div className="w-full mb-4  flex flex-col items-start justify-center">
          <label htmlFor="jobType" className="mb-1 text-base font-semibold">
            Job Experience :
          </label>
          <Select
            id="jobType"
            className="w-full mb-2 border border-indigo-600 rounded"
            onChange={e =>
              setFormData({ ...formData, job_experience: e.value })
            }
            placeholder="Please Select Job type"
            options={jobExperienceValues}
            required
          />
        </div>

        <div className="w-full mb-4  flex flex-col items-start justify-center">
          <label htmlFor="jobva" className="mb-1 text-base font-semibold">
            Job Vacancy :
          </label>
          <input
            onChange={e =>
              setFormData({ ...formData, job_vacancy: e.target.value })
            }
            min="0"
            max="100"
            type="number"
            id="jobva"
            className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
            placeholder="Enter Number of Vacancies"
            required
          />
        </div>
        <div className="w-full mb-4  flex flex-col items-start justify-center">
          <label htmlFor="jobdl" className="mb-1 text-base font-semibold">
            Job Deadline :
          </label>
          <input
            onChange={e =>
              setFormData({ ...formData, job_deadline: e.target.value })
            }
            type="date"
            id="jobdl"
            className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
            placeholder="Enter Deadline of job"
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded bg-indigo-600 text-white font-semibold tracking-widest"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
