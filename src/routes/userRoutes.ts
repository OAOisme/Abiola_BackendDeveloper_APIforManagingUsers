import { Router } from "express";
import { getAllUsertypeservice } from "../services/userservices";
import {
  addUser,
  getAllUsers,
  getOneUser,
  removeUser,
  updateUser,
} from "../controllers/userController";

const router = Router();

router.get("/", getAllUsers);

router.route("/create").post(addUser);

router.route("/:id").get(getOneUser).put(updateUser).delete(removeUser);

export default router;
