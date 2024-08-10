import express from "express";
import {
  httpAppliedJobDetails,
  httpApplyForJob,
  httpGetAppliedJobs,
} from "./applyJobs.controller.js";
import uploadCV from "../../middlewares/uploadCV.js";
import authenticateToken from "../../middlewares/authenticateToken.js";

const applyJobsRouter = express.Router();

applyJobsRouter.post(
  "/apply",
  authenticateToken,
  uploadCV.single("cv"),
  httpApplyForJob
);
applyJobsRouter.get("/getAppliedJobs", authenticateToken, httpGetAppliedJobs);
applyJobsRouter.get("/getappliedjobdetails/:id", httpAppliedJobDetails);

export default applyJobsRouter;
