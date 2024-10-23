export const config = {
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/test",
  port: parseInt(process.env.PORT || "3000"),
};
