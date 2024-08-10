import mongoose from "mongoose";

const JobsSchema = new mongoose.Schema({
  logo: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  job_type: {
    type: String,
    required: true,
  },
  job_experience: {
    type: String,
    required: true,
  },
  job_vacancy: {
    type: Number,
    required: true,
  },
  job_deadline: {
    type: Date,
    required: true,
  },
});

const jobsDatabase = mongoose.model("jobs", JobsSchema);

export default jobsDatabase;
