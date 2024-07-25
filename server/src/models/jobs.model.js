import jobsDatabase from "./jobs.mongo.js";

export const postAJob = async (user, data) => {
  const { name, email } = user;
  const {
    title,
    description,
    salary,
    company,
    job_type,
    job_experience,
    job_vacancy,
    job_deadline,
  } = data;
  return await jobsDatabase.create({
    name,
    email,
    title,
    description,
    salary,
    company,
    job_type,
    job_experience,
    job_vacancy,
    job_deadline,
  });
};

export const getJobs = async () => {
  return await jobsDatabase.find({});
};

export const getJobById = async id => {
  return await jobsDatabase.findOne({ _id: id });
};
