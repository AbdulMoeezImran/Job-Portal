import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import {
  educationValues,
  industryValues,
  jobTypeValues,
  jobExperienceValues,
} from "@/Data/JobValData";
import { putRequest } from "@/GlobalFunctions/ApiRequest";
import Select from "react-select";

const EditJob = ({ editJob, setEditJob }) => {
  const [formData, setFormData] = useState({
    title: editJob.title,
    salary: editJob.salary,
    description: editJob.description,
    education: editJob.education,
    industry: editJob.industry,
    job_type: editJob.job_type,
    job_experience: editJob.job_experience,
    job_vacancy: editJob.job_vacancy,
    job_deadline: editJob.job_deadline,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await putRequest("/jobs", formData, "application/json");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-inner-section flex-c w-full gap-3 p-6 md:w-1/2">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-xl font-bold text-indigo-600">Edit Job</h4>
          <GrClose
            className="cursor-pointer hover:text-red-500"
            onClick={() => setEditJob(null)}
          />
        </div>
        <form onSubmit={handleSubmit} className="size-full overflow-y-auto">
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
              defaultValue={educationValues.find(
                (option) => option.value === formData.education,
              )}
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
              defaultValue={industryValues.find(
                (option) => option.value === formData.industry,
              )}
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
              defaultValue={jobTypeValues.find(
                (option) => option.value === formData.job_type,
              )}
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
              defaultValue={jobExperienceValues.find(
                (option) => option.value === formData.job_experience,
              )}
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
              value={formData.job_deadline.split("T")[0]}
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

      <div className="popup-close" onClick={() => setEditJob(null)} />
    </div>
  );
};

export default EditJob;
