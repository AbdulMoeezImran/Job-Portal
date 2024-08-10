import applyJobsDatabase from "./applyJobs.mongo.js";
import authDatabase from "./auth.mongo.js";
export const applyForJob = async (email, file, { job }) => {
  // Find the user by email
  const user = await authDatabase.findOne({ email });

  // If a new file is uploaded, update the CV link
  if (file) {
    user.cv = file; // Update the user's CV in the database
    await user.save(); // Save the updated user record
  }

  // If there is no CV (neither existing nor uploaded), throw an error
  if (!file || !user.cv) {
    throw new Error("Please upload your CV");
  }

  // Check if the user has already applied for this job
  const check = await applyJobsDatabase.findOne({ email, job });
  if (check) {
    throw new Error("Already Applied");
  }

  // Create the job application
  return await applyJobsDatabase.create({
    name: user.name,
    email,
    cv: file ? file : user.cv,
    job,
  });
};

export const getAppliedJobs = async email =>
  await applyJobsDatabase.find({ email }).populate("job");

export const appliedJobDetails = async id =>
  await applyJobsDatabase.find({ job: id });
