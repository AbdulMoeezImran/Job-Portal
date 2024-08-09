import Select from "react-select";
import React, { useState } from "react";
import Router from "next/router";
import { postRequest } from "@/GlobalFunctions/ApiRequest";
import {
  educationValues,
  industryValues,
  jobTypeValues,
  jobExperienceValues,
} from "@/Data/JobValData";

export default function Postajob() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postRequest("/jobs", formData, "application/json");
      Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center py-20">
      <h1 className="mb-8 mt-4 border-b-2 border-b-indigo-600 py-2 text-xl font-semibold uppercase tracking-widest md:text-2xl lg:text-4xl">
        Enter Job Details
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mx-4 h-full w-full px-4 md:w-1/2"
      >
        <label className="mb-4 flex w-full flex-col items-start justify-center">
          <p className="mb-1 text-base font-semibold">Title :</p>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="mb-2 w-full rounded border border-indigo-600 px-3 py-2"
            placeholder="Enter title of job"
            required
          />
        </label>

        <label className="mb-4 flex w-full flex-col items-start justify-center">
          <p className="mb-1 text-base font-semibold">Salary :</p>
          <input
            type="number"
            value={formData.salary}
            onChange={(e) =>
              setFormData({ ...formData, salary: e.target.value })
            }
            min="0"
            className="mb-2 w-full rounded border border-indigo-600 px-3 py-2"
            placeholder="Enter salary per month"
            required
          />
        </label>

        <label className="mb-4 flex w-full flex-col items-start justify-center">
          <p className="mb-1 text-base font-semibold">Description :</p>
          <textarea
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="mb-2 w-full rounded border border-indigo-600 px-3 py-2"
            placeholder="Enter description of job"
            required
          />
        </label>

        <label className="mb-4 flex w-full flex-col items-start justify-center">
          <p className="mb-1 text-base font-semibold">Education :</p>
          <Select
            value={formData.education}
            className="mb-2 w-full rounded border border-indigo-600"
            onChange={(e) => setFormData({ ...formData, education: e.value })}
            placeholder="Please Select Education"
            options={educationValues}
            required
          />
        </label>

        <label className="mb-4 flex w-full flex-col items-start justify-center">
          <p className="mb-1 text-base font-semibold">Industry :</p>
          <Select
            value={formData.industry}
            className="mb-2 w-full rounded border border-indigo-600"
            onChange={(e) => setFormData({ ...formData, industry: e.value })}
            placeholder="Please Select Industry"
            options={industryValues}
            required
          />
        </label>

        <label className="mb-4 flex w-full flex-col items-start justify-center">
          <p className="mb-1 text-base font-semibold">Job Type :</p>
          <Select
            value={formData.job_type}
            className="mb-2 w-full rounded border border-indigo-600"
            onChange={(e) => setFormData({ ...formData, job_type: e.value })}
            placeholder="Please Select Job type"
            options={jobTypeValues}
            required
          />
        </label>

        <label className="mb-4 flex w-full flex-col items-start justify-center">
          <p className="mb-1 text-base font-semibold">Job Experience :</p>
          <Select
            value={formData.job_experience}
            className="mb-2 w-full rounded border border-indigo-600"
            onChange={(e) =>
              setFormData({ ...formData, job_experience: e.value })
            }
            placeholder="Please Select Job type"
            options={jobExperienceValues}
            required
          />
        </label>

        <label className="mb-4 flex w-full flex-col items-start justify-center">
          <p className="mb-1 text-base font-semibold">Job Vacancy :</p>
          <input
            type="number"
            value={formData.job_vacancy}
            onChange={(e) =>
              setFormData({ ...formData, job_vacancy: e.target.value })
            }
            min="0"
            max="100"
            className="mb-2 w-full rounded border border-indigo-600 px-3 py-2"
            placeholder="Enter Number of Vacancies"
            required
          />
        </label>

        <label className="mb-4 flex w-full flex-col items-start justify-center">
          <p className="mb-1 text-base font-semibold">Job Deadline :</p>
          <input
            type="date"
            value={formData.job_deadline}
            onChange={(e) =>
              setFormData({ ...formData, job_deadline: e.target.value })
            }
            className="mb-2 w-full rounded border border-indigo-600 px-3 py-2"
            placeholder="Enter Deadline of job"
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </label>
        <button
          type="submit"
          className="w-full rounded bg-indigo-600 py-2 font-semibold tracking-widest text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
