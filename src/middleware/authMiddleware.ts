import Jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { config } from "../config";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = Jwt.verify(token, config.jwtSecret);
    //@ts-ignore
    if (decoded.role !== "admin") {
      res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
      return;
    }
    req.body.user = decoded;
    next();
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
  }
};
