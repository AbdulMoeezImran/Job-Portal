import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth/auth.router.js";
import jobsRouter from "./routes/jobs/jobs.router.js";
import applyJobsRouter from "./routes/applyJobs/applyJobs.router.js";

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRouter);
app.use("/api/jobs", jobsRouter);
app.use("/api/applied-jobs", applyJobsRouter);

export default app;
