import {
  registerUser,
  loginUser,
  forgetPassword,
  userInfo,
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

export const httpUserInfo = async (req, res) => {
  const data = req.user;
  try {
    const result = await userInfo(data);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
