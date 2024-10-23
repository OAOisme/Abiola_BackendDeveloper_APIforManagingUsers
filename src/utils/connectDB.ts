import { config } from "../config";

const mongoose = require("mongoose");

export const connectDB = async () => {
  mongoose.connect(config.mongoURI);
};
