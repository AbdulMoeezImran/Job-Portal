import authDatabase from "./auth.mongo.js";
import jobsDatabase from "./jobs.mongo.js";

export const postAJob = async (email, data) => {
  const user = await authDatabase.findOne({ email });
  const { logo, company, address } = user;

  return await jobsDatabase.create({ logo, email, company, address, ...data });
};

export const getJobs = async () => {
  return await jobsDatabase.find({});
};

export const getJobById = async id => {
  return await jobsDatabase.findOne({ _id: id });
};
