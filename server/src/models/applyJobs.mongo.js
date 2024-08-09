import mongoose from "mongoose";

const ApplyJobsSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobs",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    cv: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const applyJobsDatabase = mongoose.model("apply-jobs", ApplyJobsSchema);

export default applyJobsDatabase;
