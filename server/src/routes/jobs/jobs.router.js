import express from "express";
import {
  httpPostAJob,
  httpGetJobs,
  httpGetJobById,
  httpGetPostedJobs,
} from "./jobs.controller.js";
import authenticateToken from "../../middlewares/authenticateToken.js";

const jobsRouter = express.Router();

jobsRouter.post("/", authenticateToken, httpPostAJob);
jobsRouter.get("/", httpGetJobs);
jobsRouter.get("/getPostedJobs", authenticateToken, httpGetPostedJobs);
jobsRouter.get("/:id", httpGetJobById);

export default jobsRouter;
