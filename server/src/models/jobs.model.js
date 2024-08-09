import authDatabase from "./auth.mongo.js";
import jobsDatabase from "./jobs.mongo.js";

export const postAJob = async (email, data) => {
  const user = await authDatabase.findOne({ email });
  const { logo, company, address } = user;

  return await jobsDatabase.create({ logo, email, company, address, ...data });
};
export const updateAJob = async (email, data) => {
  return await jobsDatabase.updateOne({ email }, { ...data });
};

export const getJobs = async () => {
  const jobs = await jobsDatabase.find({});

  const updatedJobs = await Promise.all(
    jobs.map(async job => {
      if (
        job.logo &&
        job.logo.startsWith("http://localhost:4000/uploads\\logo-")
      ) {
        const newLogo = job.logo.replace(
          "http://localhost:4000/uploads\\logo-",
          "http://localhost:4000/uploads\\logos\\logo-"
        );

        // Update the logo URL in the database
        await jobsDatabase.updateOne(
          { _id: job._id },
          { $set: { logo: newLogo } }
        );

        // Update the logo in the job object as well
        job.logo = newLogo;
      }
      return job;
    })
  );

  return updatedJobs;
};

export const getJobById = async id => {
  return await jobsDatabase.findOne({ _id: id });
};

export const getPostedJobs = async email => {
  return await jobsDatabase.find({ email });
};
