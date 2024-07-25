import { postAJob, getJobs, getJobById } from "../../models/jobs.model.js";

export const httpPostAJob = async (req, res) => {
  const user = req.user;
  const data = req.body;
  try {
    const result = await postAJob(user, data);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const httpGetJobs = async (req, res) => {
  try {
    const result = await getJobs();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const httpGetJobById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await getJobById(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
