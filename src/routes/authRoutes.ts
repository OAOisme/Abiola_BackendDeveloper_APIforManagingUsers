import { Router } from "express";
import { loginAdmin } from "../controllers/authController";

const router = Router();

router.route("/login").post(loginAdmin);

export default router;
