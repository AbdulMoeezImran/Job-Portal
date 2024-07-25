import express from "express";
import {
  httpPostAJob,
  httpGetJobs,
  httpGetJobById,
} from "./jobs.controller.js";
import authenticateToken from "../../middlewares/authenticateToken.js";

const jobsRouter = express.Router();

jobsRouter.post("/", authenticateToken, httpPostAJob);
jobsRouter.get("/", httpGetJobs);
jobsRouter.get("/:id", httpGetJobById);

export default jobsRouter;
