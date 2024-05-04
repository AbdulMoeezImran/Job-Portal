import express from "express";
import {
  httpRegisterUser,
  httpLoginUser,
  httpForgetPassword,
  httpUserInfo,
} from "./auth.controller.js";
import jwt from "jsonwebtoken";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log(token);

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

const authRouter = express.Router();

authRouter.post("/register", httpRegisterUser);
authRouter.post("/login", httpLoginUser);
authRouter.put("/forgetPassword", httpForgetPassword);
authRouter.get("/userinfo", authenticateToken, httpUserInfo);

export default authRouter;
