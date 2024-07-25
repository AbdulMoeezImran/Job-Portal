import mongoose from "mongoose";

const JobsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  company: {
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
