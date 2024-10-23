import { NextFunction, Request, Response } from "express";
import {
  addUserservice,
  getAllAdminservice,
  getAllUserservice,
  getAllUsertypeservice,
  getOneUserservice,
  getUserbyEmailservice,
  removeUserservice,
  updateUserservice,
} from "../services/userservices";
import { StatusCodes } from "http-status-codes";
import { isStrongPassword, isValidEmail } from "../utils/dataChecker";

export const getAllUsers = async (req: Request, res: Response) => {
  let limit,
    skip = 0;
  req.query.limit ? (limit = parseInt(req.query.limit as string)) : (limit = 0);
  req.query.skip ? (skip = parseInt(req.query.skip as string)) : (skip = 0);
  if (!req.query.userType) {
    const users = await getAllUsertypeservice(limit, skip);

    res.status(StatusCodes.OK).send(users);
  } else {
    const { userType } = req.query;
    if (userType !== "admin" && userType !== "user") {
      res.status(StatusCodes.BAD_REQUEST).send("Invalid user type");
      return;
    }
    let filteredUsers;
    if (userType === "admin") {
      filteredUsers = await getAllAdminservice(limit, skip);
    } else {
      filteredUsers = await getAllUserservice(limit, skip);
    }

    res.status(StatusCodes.OK).send(filteredUsers);
  }
};

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, role } = req.body;

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

  if (!name || !email || !password) {
    res.status(StatusCodes.BAD_REQUEST).send("Missing required fields");
    return;
  }

  if (role !== "admin" && role !== "user") {
    res.status(StatusCodes.BAD_REQUEST).send("Invalid role");
    return;
  }

  if (await getUserbyEmailservice(email)) {
    res.status(StatusCodes.BAD_REQUEST).send("User already exists");
    return;
  }

  const newUser = await addUserservice({ name, email, password, role });

  if (!newUser) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    return;
  }

  res.status(StatusCodes.CREATED).send(newUser);
};

export const removeUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await removeUserservice(id);
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).send("User not found");
    return;
  }
  res.status(StatusCodes.OK).send("User removed");
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  const user = await updateUserservice(id, { name, email, password, role });
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).send("User not found");
    return;
  }
  res.status(StatusCodes.OK).send("User updated");
};

export const getOneUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getOneUserservice(id);
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).send("User not found");
    return;
  }
  res.status(StatusCodes.OK).send(user);
};
