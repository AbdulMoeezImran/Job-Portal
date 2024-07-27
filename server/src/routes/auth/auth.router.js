import express from "express";
import {
  httpRegisterUser,
  httpLoginUser,
  httpForgetPassword,
  httpUserInfo,
  httpResetPassword,
} from "./auth.controller.js";
import authenticateToken from "../../middlewares/authenticateToken.js";

const authRouter = express.Router();

authRouter.post("/register", httpRegisterUser);
authRouter.post("/login", httpLoginUser);
authRouter.post("/forgetPassword", httpForgetPassword);
authRouter.put("/resetPassword/:id", httpResetPassword);
authRouter.get("/userinfo", authenticateToken, httpUserInfo);

export default authRouter;
