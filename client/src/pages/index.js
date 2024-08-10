import React, { useState, useEffect } from "react";
import JobsCard from "@/Components/JobsCard";
import Loader from "@/Components/Loader";
import { getRequest } from "@/GlobalFunctions/ApiRequest";
import useSWR from "swr";
import CheckBoxLayout from "@/Components/CheckBoxLayout";
import { GrClose } from "react-icons/gr";
import {
  educationValues,
  jobTypeValues,
  jobExperienceValues,
} from "@/Data/JobValData";

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
  const [topicStats, setTopicStats] = useState({
    totalJobs: 0,
    averageSalary: 0,
    maxSalary: 0,
    minSalary: Infinity,
  });

  const getJob = async () => {
    try {
      const data = await getRequest("/jobs");
      setJobData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const { isLoading } = useSWR("/getjobs", getJob);

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    setFilters((prevState) => {
      if (checked) {
        return { ...prevState, [name]: [...prevState[name], value] };
      } else {
        return {
          ...prevState,
          [name]: prevState[name].filter((item) => item !== value),
        };
      }
    });
  };

  const filterJobsBySalaryRange = (job, salaryRange) => {
    for (const range of salaryRange) {
      const [min, max] = range.split("-").map(Number);
      if (job.salary >= min && job.salary <= max) {
        return true;
      }
    }
    return false;
  };

  const filteredJobs = JobData.filter((job) => {
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

    return (
      matchesSearchQuery &&
      matchesJobType &&
      matchesEducation &&
      matchesExperience &&
      matchesSalary
    );
  });

  useEffect(() => {
    calculateTopicStats(filteredJobs);
  }, [searchQuery]);

  const calculateTopicStats = (jobs) => {
    if (jobs.length === 0) {
      setTopicStats({
        totalJobs: 0,
        averageSalary: 0,
        maxSalary: 0,
        minSalary: 0,
      });
      return;
    }

    // Convert salary strings to numbers
    const salaries = jobs.map((job) => Number(job.salary));
    const totalJobs = jobs.length;

    const averageSalary = (
      salaries.reduce((acc, salary) => acc + salary, 0) / totalJobs
    ).toFixed(0);
    const maxSalary = Math.max(...salaries);
    const minSalary = Math.min(...salaries);

    setTopicStats({
      totalJobs,
      averageSalary,
      maxSalary,
      minSalary,
    });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="flex w-full flex-col items-center justify-center px-2 py-20 md:px-8">
        <div className="my-4 w-[80%] sm:w-[60%]">
          <div className="md:flex-rcc max-md:flex-ccc gap-1">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search jobs by title or location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-2 w-full rounded border border-indigo-600 px-3 py-2"
            />

            <button
              className="mb-2 w-full rounded bg-indigo-600 px-5 py-2.5 text-center font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 md:w-fit"
              onClick={() => setFilterPopup(true)}
            >
              Filters
            </button>
          </div>
          {/* Topic Statistics */}
          {searchQuery && (
            <div className="flex-rc flex-wrap gap-2">
              <h2 className="text-lg font-semibold">Job Statistics:</h2>
              <p className="w-fit rounded border border-indigo-600 p-1 text-xs text-indigo-600">
                Total Jobs: {topicStats.totalJobs}
              </p>
              <p className="w-fit rounded border border-indigo-600 p-1 text-xs text-indigo-600">
                Average Salary: Rs {topicStats.averageSalary}
              </p>
              <p className="w-fit rounded border border-indigo-600 p-1 text-xs text-indigo-600">
                Maximum Salary: Rs {topicStats.maxSalary}
              </p>
              <p className="w-fit rounded border border-indigo-600 p-1 text-xs text-indigo-600">
                Minimum Salary: Rs {topicStats.minSalary}
              </p>
            </div>
          )}
        </div>

        <h1 className="mx-2 border-b-2 border-b-indigo-600 px-4 py-2 text-3xl font-semibold uppercase tracking-wider">
          Available Jobs
        </h1>

        <div className="flex h-full w-full flex-wrap items-center justify-center overflow-y-auto py-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <JobsCard job={job} key={job._id} />)
          ) : (
            <p>No jobs found</p>
          )}
        </div>
      </div>

      {filterPopup && (
        <div className="popup-container">
          <div className="popup-inner-section flex-c w-full max-w-md gap-3 p-6">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-xl font-bold text-indigo-600">Filters</h4>
              <GrClose
                className="cursor-pointer hover:text-red-500"
                onClick={() => setFilterPopup(false)}
              />
            </div>

            <div className="flex-rwcb overflow-y-auto">
              {/* Job Type Filters */}
              <div>
                <h2 className="font-semibold">Job Type</h2>
                <div className="flex flex-wrap gap-3">
                  {jobTypeValues.map((type) => (
                    <label key={type.value} className="flex-rcc">
                      <CheckBoxLayout>
                        <input
                          type="checkbox"
                          name="jobType"
                          value={type.value}
                          onChange={handleFilterChange}
                          checked={filters.jobType.includes(type.value)}
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
                  {educationValues.map((edu) => (
                    <label key={edu.value} className="flex-rcc">
                      <CheckBoxLayout>
                        <input
                          type="checkbox"
                          name="education"
                          value={edu.value}
                          onChange={handleFilterChange}
                          checked={filters.education.includes(edu.value)}
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
                  {jobExperienceValues.map((exp) => (
                    <label key={exp.value} className="flex-rcc">
                      <CheckBoxLayout>
                        <input
                          type="checkbox"
                          name="experience"
                          value={exp.value}
                          onChange={handleFilterChange}
                          checked={filters.experience.includes(exp.value)}
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
                  {jobSalaryValues.map((salary) => (
                    <label key={salary.value} className="flex-rcc">
                      <CheckBoxLayout>
                        <input
                          type="checkbox"
                          name="salaryRange"
                          value={salary.value}
                          onChange={handleFilterChange}
                          checked={filters.salaryRange.includes(salary.value)}
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
