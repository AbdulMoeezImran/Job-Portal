import {
  registerUser,
  loginUser,
  forgetPassword,
  resetPassword,
  employerSetup,
  getUserInfo,
  updateUserInfo,
} from "../../models/auth.model.js";

export const httpRegisterUser = async (req, res) => {
  const data = req.body;
  try {
    const result = await registerUser(data);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const httpLoginUser = async (req, res) => {
  const data = req.body;
  try {
    const result = await loginUser(data);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const httpForgetPassword = async (req, res) => {
  const data = req.body;
  try {
    const result = await forgetPassword(data);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const httpResetPassword = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const result = await resetPassword(id, data);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const httpEmployerSetup = async (req, res) => {
  const email = req.email;
  const data = req.body;
  try {
    const result = await employerSetup(email, data);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const httpGetUserInfo = async (req, res) => {
  const email = req.email;
  try {
    const result = await getUserInfo(email);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const httpUpdateUserInfo = async (req, res) => {
  const email = req.email;
  const file = req.file ? req.file.path : null;
  const data = req.body;
  try {
    const result = await updateUserInfo(email, file, data);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
