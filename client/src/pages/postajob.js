import Select from "react-select";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import { postRequest } from "@/GlobalFunctions/ApiRequest";
import { useSelector } from "react-redux";

const options = [
  { value: "fulltime", label: "Full Time" },
  { value: "parttime", label: "Part Time" },
  { value: "internship", label: "Internship" },
  { value: "contract", label: "Contract" },
];

export default function Postajob() {
  const userInfo = useSelector(state => state.user.userInfo);
  const [formData, setFormData] = useState({
    title: "",
    salary: 0,
    company: "",
    description: "",
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

  useEffect(() => {
    if (!userInfo) {
      Router.push("/auth/login");
    }
  }, [userInfo]);

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
            placeholder="Enter Salary for this job"
            required
          />
        </div>
        <div className="w-full mb-4  flex flex-col items-start justify-center">
          <label htmlFor="company" className="mb-1 text-base font-semibold">
            Company :
          </label>
          <input
            onChange={e =>
              setFormData({ ...formData, company: e.target.value })
            }
            type="text"
            id="company"
            className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
            placeholder="Enter Company of job"
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
          <label htmlFor="jobType" className="mb-1 text-base font-semibold">
            Job Type :
          </label>
          <Select
            id="jobType"
            className="w-full mb-2 border border-indigo-600 rounded"
            onChange={e => setFormData({ ...formData, job_type: e.value })}
            placeholder="Please Select Job type"
            options={options}
            required
          />
        </div>

        <div className="w-full mb-4  flex flex-col items-start justify-center">
          <label
            htmlFor="jobExperience"
            className="mb-1 text-base font-semibold"
          >
            Job Experience :
          </label>
          <input
            onChange={e =>
              setFormData({ ...formData, job_experience: e.target.value })
            }
            type="text"
            id="jobExperience"
            className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
            placeholder="Enter Experience Required for this job"
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
            max="1000"
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
