import { connectDB } from "./utils/connectDB";
import express from "express";
import { config } from "./config";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

const start = async () => {
  await connectDB(config.mongoURI);
  app.listen(config.port, () => {
    console.log(`Currently listening on port ${config.port}`);
  });
};

start();
