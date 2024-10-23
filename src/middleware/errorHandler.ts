import { Request, Response, NextFunction } from "express";
import { MongoServerError } from "mongodb";

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof MongoServerError) {
    if (err.code === 11000) {
      // Handle duplicate key error
      res
        .status(400)
        .json({ message: "Duplicate key error", details: err.keyValue });
    } else {
      // Handle other MongoDB errors
      res.status(500).json({ message: "MongoDB error", details: err.message });
    }
  } else {
    // Handle other errors
    res
      .status(500)
      .json({ message: "Internal Server Error", details: err.message });
  }
};
