import { Router } from "express";
import { loginAdmin } from "../controllers/authController";

const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:  # Define the security scheme for Bearer token
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Indicate that the token is in JWT format
 *
 * /api/auth/login:
 *   post:
 *     summary: Login as admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login, returns a token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized - invalid credentials
 *       204:
 *         description: Admin not found and no users exist, new admin created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 */
router.route("/login").post(loginAdmin);

export default router;
