import express, { Request, Response, NextFunction } from "express";
import { connectDB } from "./utils/connectDB";
import { config } from "./config";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Users API",
      version: "1.0.0",
      description: "A simple user management API",
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new Error(`This path ${req.originalUrl} isn't on this server!`));
});

const start = async () => {
  await connectDB(config.mongoURI);
  app.listen(config.port, () => {
    console.log(`Currently listening on port ${config.port}`);
  });
};

start();
