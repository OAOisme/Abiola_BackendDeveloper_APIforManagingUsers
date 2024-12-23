import { NextFunction, Request, Response } from "express";
import { findAdminService } from "../services/authServices";
import { StatusCodes } from "http-status-codes";
import bycrypt from "bcrypt";
import { config } from "../config";
import jwt from "jsonwebtoken";
import { addUserservice, noOfUserservice } from "../services/userservices";
import { isStrongPassword, isValidEmail } from "../utils/dataChecker";

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
      if (!isValidEmail(email)) {
        res.status(StatusCodes.BAD_REQUEST).send("Invalid email");
        return;
      }

      if (!isStrongPassword(password)) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send(
            "Password should be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number and one special character"
          );
        return;
      }

      const newUser = await addUserservice({
        name: "admin",
        email: email,
        password: password,
        role: "admin",
      });
      if (!newUser) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send("Internal Server Error");
        return;
      }
      const token = jwt.sign(
        { id: newUser._id, role: newUser.role },
        config.jwtSecret,
        {
          expiresIn: "1h",
        }
      );
      res.status(StatusCodes.CREATED).send({ Token: token });
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
