export const config = {
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/test",
  port: parseInt(process.env.PORT || "3000"),
  environment: process.env.NODE_ENV || "development",
  jwtSecret: process.env.SECRET_JWT || "secret",
};
