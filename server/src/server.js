import http from "http";
import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MONGO_URL = process.env.MONGO_CONNECTION_URL;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", err => {
  console.error("err");

  startServer();
});

const server = http.createServer(app);

const startServer = async () => {
  await mongoose.connect(MONGO_URL);

  server.listen(4000, () => {
    console.log(`Listening on port 4000...`);
  });
};

startServer();
