import React, { useState, useEffect } from "react";
import JobsCard from "@/Components/JobsCard";
import Loader from "@/Components/Loader";
import { getRequest } from "@/GlobalFunctions/ApiRequest";
import useSWR from "swr";
import CheckBoxLayout from "@/Components/CheckBoxLayout";
import { GrClose } from "react-icons/gr";

const educationValues = [
  { value: "Intermediate", label: "Intermediate" },
  { value: "Bachlor", label: "Bachlor" },
  { value: "Master", label: "Master" },
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

const jobSalaryValues = [
  { value: "0-20000", label: "Rs 0-20000" },
  { value: "20000-50000", label: "Rs 20000-50000" },
  { value: "50000-100000", label: "Rs 50000-100000" },
  { value: "100000-200000", label: "Rs 100000-200000" },
  { value: "200000-300000", label: "Rs 200000-300000" },
  { value: "300000-500000", label: "Rs 300000-500000" },
  { value: "500000-1000000", label: "Rs 500000-1000000" },
];

export default function Home() {
  const [JobData, setJobData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    address: "",
    jobType: [],
    education: [],
    experience: [],
    salaryRange: [],
  });
  const [filterPopup, setFilterPopup] = useState(false);

  const getJob = async () => {
    try {
      const data = await getRequest("/jobs");
      setJobData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const { isLoading } = useSWR("/getjobs", getJob);

  const handleFilterChange = e => {
    const { name, value, checked } = e.target;
    setFilters(prevState => {
      if (name === "address") {
        return { ...prevState, address: value.toLowerCase().trim() };
      } else if (checked) {
        return { ...prevState, [name]: [...prevState[name], value] };
      } else {
        return {
          ...prevState,
          [name]: prevState[name].filter(item => item !== value),
        };
      }
    });
  };

  const uniqueAddresses = [
    ...new Set(JobData.map(job => job.address.toLowerCase().trim())),
  ];

  const filterJobsBySalaryRange = (job, salaryRange) => {
    for (const range of salaryRange) {
      const [min, max] = range.split("-").map(Number);
      if (job.salary >= min && job.salary <= max) {
        return true;
      }
    }
    return false;
  };

  const filteredJobs = JobData.filter(job => {
    const matchesSearchQuery =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesJobType =
      filters.jobType.length === 0 || filters.jobType.includes(job.job_type);
    const matchesEducation =
      filters.education.length === 0 ||
      filters.education.includes(job.education);
    const matchesExperience =
      filters.experience.length === 0 ||
      filters.experience.includes(job.job_experience);
    const matchesSalary =
      filters.salaryRange.length === 0 ||
      filterJobsBySalaryRange(job, filters.salaryRange);
    const matchesAddress =
      filters.address === "" ||
      job.address.toLowerCase().trim() === filters.address;

    return (
      matchesSearchQuery &&
      matchesJobType &&
      matchesEducation &&
      matchesExperience &&
      matchesSalary &&
      matchesAddress
    );
  });

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="w-full py-20 flex items-center md:px-8 px-2 justify-center flex-col">
        <div className="md:flex-rcc w-[80%] max-md:flex-ccc gap-1 my-4">
          <div className="flex w-full max-md:flex-col gap-1">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
            />

            {/* Address Filter */}
            <select
              name="address"
              value={filters.address}
              onChange={handleFilterChange}
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
            >
              <option value="" selected disabled hidden>
                Address
              </option>
              {uniqueAddresses.map((address, index) => (
                <option key={index} value={address} className=" capitalize ">
                  {address}
                </option>
              ))}
            </select>
          </div>
          <button
            className="w-full md:w-fit mb-2 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded px-5 py-2.5 text-center"
            onClick={() => setFilterPopup(true)}
          >
            Filters
          </button>
        </div>

        <h1 className="px-4 mx-2 py-2 uppercase tracking-wider border-b-2 border-b-indigo-600 text-3xl font-semibold">
          Available Jobs
        </h1>
        <div className="w-full h-full py-4 flex overflow-y-auto items-center justify-center flex-wrap">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => <JobsCard job={job} key={job._id} />)
          ) : (
            <p>No jobs found</p>
          )}
        </div>
      </div>

      {filterPopup && (
        <div className="popup-container">
          <div className="popup-inner-section w-full max-w-md p-6 flex-c gap-3">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-xl font-bold text-indigo-600">Filters</h4>
              <GrClose
                className="cursor-pointer hover:text-red-500"
                onClick={() => setFilterPopup(false)}
              />
            </div>

            <div className="flex-rwcb">
              {/* <label className="flex min-w-[48%] flex-grow flex-col gap-1">
                Audio Transcriptions Minutes
                <input
                  type="number"
                  min="0"
                  max={dataLimits.remainingVoiceovers}
                  className="field-md2"
                  value={formData.transcriptions}
                  onChange={e =>
                    setFormData({ ...formData, transcriptions: e.target.value })
                  }
                />
              </label> */}

              {/* Job Type Filters */}
              <div>
                <h2 className="font-semibold">Job Type</h2>
                <div className="flex flex-wrap gap-3">
                  {jobTypeValues.map(type => (
                    <label key={type.value} className="flex-rcc">
                      <CheckBoxLayout>
                        <input
                          type="checkbox"
                          name="jobType"
                          value={type.value}
                          onChange={handleFilterChange}
                          className="checkbox-input peer"
                        />
                      </CheckBoxLayout>
                      {type.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Education Filters */}
              <div>
                <h2 className="font-semibold">Education</h2>
                <div className="flex flex-wrap gap-3">
                  {educationValues.map(edu => (
                    <label key={edu.value} className="flex-rcc">
                      <CheckBoxLayout>
                        <input
                          type="checkbox"
                          name="education"
                          value={edu.value}
                          onChange={handleFilterChange}
                          className="checkbox-input peer"
                        />
                      </CheckBoxLayout>
                      {edu.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Filters */}
              <div>
                <h2 className="font-semibold">Experience</h2>
                <div className="flex flex-wrap gap-3">
                  {jobExperienceValues.map(exp => (
                    <label key={exp.value} className="flex-rcc">
                      <CheckBoxLayout>
                        <input
                          type="checkbox"
                          name="experience"
                          value={exp.value}
                          onChange={handleFilterChange}
                          className="checkbox-input peer"
                        />
                      </CheckBoxLayout>
                      {exp.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary Range Filter */}
              <div>
                <h2 className="font-semibold">Salary Range</h2>
                <div className="flex flex-wrap gap-3">
                  {jobSalaryValues.map(salary => (
                    <label key={salary.value} className="flex-rcc">
                      <CheckBoxLayout>
                        <input
                          type="checkbox"
                          name="salaryRange"
                          value={salary.value}
                          onChange={handleFilterChange}
                          className="checkbox-input peer"
                        />
                      </CheckBoxLayout>
                      {salary.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="popup-close" onClick={() => setFilterPopup(false)} />
        </div>
      )}
    </>
  );
}
