const mongoose = require("mongoose");

export const connectDB = async (URL: any) => {
  mongoose.connect(URL);
};
