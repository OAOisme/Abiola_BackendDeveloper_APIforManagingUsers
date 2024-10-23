import { connectDB } from "./utils/connectDB";
import express from "express";
import { config } from "./config";

const app = express();

const start = async () => {
  await connectDB(config.mongoURI);
  app.listen(config.port, () => {
    console.log(`Currently listening on port ${config.port}`);
  });
};

start();
