/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */



import express from "express";
import { login, signup } from "../controllers/authControllers.js";



const authRouter = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Log in with the provided email and password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully.
 *       '400':
 *         description: Invalid email, password, or user not found.
 *       '500':
 *         description: Internal server error.
 */
authRouter.post("/login", login);


/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User signup
 *     description: Register a new user with the provided name, email, and password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User signed up successfully.
 *       '400':
 *         description: User already exists or invalid input.
 *       '500':
 *         description: Internal server error.
 */
authRouter.post("/signup", signup);


export default authRouter;