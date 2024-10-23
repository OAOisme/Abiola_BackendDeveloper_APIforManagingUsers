import { NextFunction, Request, Response } from "express";
import { findAdminService } from "../services/authServices";
import { StatusCodes } from "http-status-codes";
import bycrypt from "bcrypt";
import { config } from "../config";
import jwt from "jsonwebtoken";
import { addUserservice, noOfUserservice } from "../services/userservices";

export const loginAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Missing required fields");
    return;
  }

  const admin = await findAdminService(email);
  if (!admin) {
    if (!(await noOfUserservice())) {
      const newUser = await addUserservice({
        name: "admin",
        email: email,
        password: password,
        role: "admin",
      });
      const token = jwt.sign(
        { id: newUser._id, role: newUser.role },
        config.jwtSecret,
        {
          expiresIn: "1h",
        }
      );
      res.status(StatusCodes.OK).send({ Token: token });
      return;
    }
    res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
    return;
  }

  if (!(await bycrypt.compare(password, admin.password))) {
    res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
  }

  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    config.jwtSecret,
    {
      expiresIn: "1h",
    }
  );

  res.status(StatusCodes.OK).send({ Token: token });
};
