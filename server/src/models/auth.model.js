import authDatabase from "./auth.mongo.js";
import jwt from "jsonwebtoken";

export const registerUser = async ({ name, email, password }) => {
  return await authDatabase.create({ name, email, password });
};

export const loginUser = async ({ email, password }) => {
  const findUser = await authDatabase.findOne({ email });
  if (!findUser) {
    throw new Error("User doesn't exist");
  }

  if (password !== findUser.password) {
    throw new Error("Password is incorrect");
  }

  const accessToken = jwt.sign(
    { email: findUser.email },
    process.env.ACCESS_TOKEN_SECRET
  );

  return accessToken;
};

export const forgetPassword = async ({ email, password }) => {
  const changePassword = await authDatabase.updateOne({ email }, { password });

  if (changePassword.matchedCount !== 1) {
    throw new Error("User doesn't exist");
  }

  if (changePassword.modifiedCount !== 1) {
    throw new Error("You can't use your old password");
  }

  return (
    changePassword.matchedCount === 1 && changePassword.modifiedCount === 1
  );
};

export const userInfo = async ({ email }) => {
  const findUser = await authDatabase.findOne({ email });

  return { email: findUser.email, name: findUser.name };
};
