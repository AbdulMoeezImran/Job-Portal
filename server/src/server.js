import http from "http";
import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_CONNECTION_URL;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", err => {
  console.error("err");
});

const server = http.createServer(app);

const startServer = async () => {
  await mongoose.connect(MONGO_URL);

  server.listen(4000, () => {
    console.log(`Listening on port 4000...`);
  });
};

startServer();
