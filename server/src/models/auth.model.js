import authDatabase from "./auth.mongo.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const registerUser = async data => {
  const findUser = await authDatabase.findOne({ email: data.email });
  if (findUser) {
    throw new Error("Email already registered");
  }

  return await authDatabase.create(data);
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

  return {
    accessToken,
    userInfo: findUser,
  };
};

export const forgetPassword = async ({ email }) => {
  const findUser = await authDatabase.findOne({ email });
  if (!findUser) {
    throw new Error("User doesn't exist");
  }

  const token = jwt.sign(
    { email: findUser.email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "10m",
    }
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  // Email configuration
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Reset Password",
    html: `<h1>Reset Your Password</h1>
    <p>Click on the following link to reset your password:</p>
    <a href="http://localhost:3000/auth/reset-password/${token}">Reset Password</a>
    <p>The link will expire in 10 minutes.</p>
    <p>If you didn't request a password reset, please ignore this email.</p>`,
  };

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error sending email", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  return "Email sent successfully";
};

export const resetPassword = async (id, { password }) => {
  const email = await jwt.verify(
    id,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, data) => {
      if (err) {
        throw new Error("Invalid or expired token");
      }
      return data.email;
    }
  );

  const changePassword = await authDatabase.updateOne({ email }, { password });

  console.log(changePassword);

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

export const employerSetup = async (email, { company }) => {
  const user = await authDatabase.findOneAndUpdate(
    { email },
    { company },
    {
      new: true,
    }
  );

  return user;
};

export const getUserInfo = async email => {
  const findUser = await authDatabase.findOne({ email });

  return findUser;
};

export const updateUserInfo = async (email, file, data) => {
  const logo = file ? `http://localhost:4000/${file}` : null;
  const user = await authDatabase.findOneAndUpdate(
    { email },
    { logo, ...data },
    {
      new: true,
    }
  );
  return user;
};
