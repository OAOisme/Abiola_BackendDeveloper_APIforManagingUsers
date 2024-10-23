import { Router } from "express";
import {
  addUser,
  getAllUsers,
  getOneUser,
  removeUser,
  updateUser,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Fetches users based on specified parameters. You can filter users by user type (admin or user) and paginate the results using limit and skip.
 *     parameters:
 *       - in: query
 *         name: userType
 *         required: false
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *         description: Type of users to retrieve (admin or user).
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *         description: Maximum number of users to return. Defaults to 0 if not provided.
 *       - in: query
 *         name: skip
 *         required: false
 *         schema:
 *           type: integer
 *         description: Number of users to skip. Defaults to 0 if not provided.
 *     security:
 *       - bearerAuth: []  # Specify that the Bearer token is required
 *     responses:
 *       200:
 *         description: A list of users retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: User ID.
 *                   name:
 *                     type: string
 *                     description: Name of the user.
 *                   userType:
 *                     type: string
 *                     description: Type of the user (admin or user).
 * components:
 *   securitySchemes:
 *     bearerAuth:  # Define the security scheme for Bearer token
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Indicate that the token is in JWT format
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:  # Define the security scheme for Bearer token
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Indicate that the token is in JWT format
 *
 * /api/users/create:
 *   post:
 *     summary: Create a new user
 *     description: Adds a new user to the system. Requires name, email, and password as mandatory fields.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password for the user account.
 *               role:
 *                 type: string
 *                 description: The role of the user (optional).
 *     security:
 *       - bearerAuth: []  # Specify that the Bearer token is required
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the newly created user.
 *                 name:
 *                   type: string
 *                   description: The name of the user.
 *                 email:
 *                   type: string
 *                   description: The email address of the user.
 *                 role:
 *                   type: string
 *                   description: The role assigned to the user.
 *       400:
 *         description: Missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       500:
 *         description: Server error occurred while creating the user.
 */
router.route("/create").post(addUser);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:  # Define the security scheme for Bearer token
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Indicate that the token is in JWT format
 *
 * /api/users/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     description: Fetches a user by their unique identifier (ID).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []  # Specify that the Bearer token is required
 *     responses:
 *       200:
 *         description: User retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the user.
 *                 name:
 *                   type: string
 *                   description: The name of the user.
 *                 email:
 *                   type: string
 *                   description: The email address of the user.
 *                 role:
 *                   type: string
 *                   description: The role assigned to the user.
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update an existing user
 *     description: Updates user information based on the provided ID. Requires the user ID in the path and fields to be updated in the request body.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The new email address of the user.
 *               password:
 *                 type: string
 *                 description: The new password for the user account.
 *               role:
 *                 type: string
 *                 description: The new role of the user (optional).
 *     security:
 *       - bearerAuth: []  # Specify that the Bearer token is required
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Remove a user by ID
 *     description: Deletes a user from the system based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to remove.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []  # Specify that the Bearer token is required
 *     responses:
 *       200:
 *         description: User removed successfully.
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.route("/:id").get(getOneUser).put(updateUser).delete(removeUser);

export default router;
