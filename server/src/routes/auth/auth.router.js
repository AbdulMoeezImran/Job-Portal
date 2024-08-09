import express from "express";
import {
  httpRegisterUser,
  httpLoginUser,
  httpForgetPassword,
  httpResetPassword,
  httpEmployerSetup,
  httpGetUserInfo,
  httpUpdateUserInfo,
} from "./auth.controller.js";
import authenticateToken from "../../middlewares/authenticateToken.js";
import uploadLogo from "../../middlewares/uploadLogo.js";

const authRouter = express.Router();

authRouter.post("/register", httpRegisterUser);
authRouter.post("/login", httpLoginUser);
authRouter.post("/forgetPassword", httpForgetPassword);
authRouter.put("/resetPassword/:id", httpResetPassword);
authRouter.post("/employerSetup", authenticateToken, httpEmployerSetup);
authRouter.get("/userinfo", authenticateToken, httpGetUserInfo);
authRouter.put(
  "/userinfo",
  authenticateToken,
  uploadLogo.single("logo"),
  httpUpdateUserInfo
);

export default authRouter;
