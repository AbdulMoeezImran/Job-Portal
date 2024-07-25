import express from "express";
import {
  httpRegisterUser,
  httpLoginUser,
  httpForgetPassword,
  httpUserInfo,
} from "./auth.controller.js";
import authenticateToken from "../../middlewares/authenticateToken.js";

const authRouter = express.Router();

authRouter.post("/register", httpRegisterUser);
authRouter.post("/login", httpLoginUser);
authRouter.put("/forgetPassword", httpForgetPassword);
authRouter.get("/userinfo", authenticateToken, httpUserInfo);

export default authRouter;
