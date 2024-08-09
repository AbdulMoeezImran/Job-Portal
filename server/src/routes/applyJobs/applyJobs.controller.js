import {
  appliedJobDetails,
  applyForJob,
  getAppliedJobs,
} from "../../models/applyJobs.model.js";

export const httpApplyForJob = async (req, res) => {
  const email = req.email;
  const file = req.file ? req.file.path : null;
  const data = req.body;

  try {
    const result = await applyForJob(email, file, data);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const httpGetAppliedJobs = async (req, res) => {
  const email = req.email;

  try {
    const result = await getAppliedJobs(email);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const httpAppliedJobDetails = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await appliedJobDetails(id);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
